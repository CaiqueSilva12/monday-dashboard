<?php

use App\Http\Controllers\ProjectController;

Route::apiResource('projects', ProjectController::class);
Route::get('dashboard', [ProjectController::class, 'dashboard']); 