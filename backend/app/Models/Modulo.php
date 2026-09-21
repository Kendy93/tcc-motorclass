<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Modulo extends Model
{
    protected $fillable = [
        'titulo',
        'codigo',
        'descricao',
        'ordem',
        'imagem',
    ];

    //get dos usuários de cada módulo
    public function users(){
        return $this->belongsToMany(User::class)
            ->withPivot('completed_at')
            ->withTimestamps();
    }

    //para pegar a url
    public function getRouteKeyName(): string{
        return 'codigo';
    }
}
