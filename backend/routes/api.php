<?php

use App\Http\Controllers\ProjectController;

Route::middleware(['jwt.auth'])->group(function () {
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::get('/projects/{id}', [ProjectController::class, 'show']);
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::put('/projects/{id}', [ProjectController::class, 'update']);
    Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);
});

Route::middleware(['jwt.auth'])->group(function () {
  Route::get('dashboard', [ProjectController::class, 'dashboard']); 
});