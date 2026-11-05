#!/bin/sh
# Troca ponteiros do Git LFS pelos arquivos reais, usando a API batch do GitHub.
set -eu

dir="$1"
api="https://github.com/${GITHUB_REPO}.git/info/lfs/objects/batch"

pointers=$(grep -rl --include='*' '^version https://git-lfs.github.com/spec/v1' "$dir" || true)
if [ -z "$pointers" ]; then
    echo "LFS: nenhum ponteiro encontrado, nada a baixar."
    exit 0
fi

# Repositório público não precisa de token
auth=""
if [ -n "${GITHUB_TOKEN:-}" ]; then
    auth="x-access-token:${GITHUB_TOKEN}"
fi

for file in $pointers; do
    oid=$(sed -n 's/^oid sha256://p' "$file")
    size=$(sed -n 's/^size //p' "$file")
    href=$(curl -fsS ${auth:+-u "$auth"} \
        -H 'Accept: application/vnd.git-lfs+json' \
        -H 'Content-Type: application/vnd.git-lfs+json' \
        -d "{\"operation\":\"download\",\"transfer\":[\"basic\"],\"objects\":[{\"oid\":\"$oid\",\"size\":$size}]}" \
        "$api" | jq -r '.objects[0].actions.download.href')
    if [ -z "$href" ] || [ "$href" = "null" ]; then
        echo "LFS: objeto $oid não encontrado no GitHub ($file)" >&2
        exit 1
    fi
    curl -fsSL -o "$file" "$href"
    echo "$oid  $file" | sha256sum -c -s || { echo "LFS: checksum inválido em $file" >&2; exit 1; }
    echo "LFS: baixado $file"
done
