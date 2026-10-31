<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use App\Models\RecompensaUsuario;
use App\Models\TentativaQuestionario;
use App\Models\Certificado;

#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    //get dos módulos do usuário
    public function modulos(){
        return $this->belongsToMany(Modulo::class)
            ->withPivot('completed_at')
            ->withTimestamps();
    }

    public function recompensas(){
        return $this->hasMany(RecompensaUsuario::class);
    }

    public function tentativasQuestionario(){
        return $this->hasMany(
            TentativaQuestionario::class
        );
    }

    public function certificado(): HasOne{
        return $this->hasOne(Certificado::class);
    }
}
