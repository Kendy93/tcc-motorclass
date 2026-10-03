<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Usuário Teste',
            'email' => 'teste@teste.com',
            'password' => Hash::make('Teste.123'),
        ]);

        $this->call([
            QuestionarioSeeder::class,
        ]);
    }
}
