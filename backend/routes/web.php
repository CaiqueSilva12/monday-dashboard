<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/auth/monday/redirect', [AuthController::class, 'redirectToMonday']);
Route::get('/auth/monday/callback', [AuthController::class, 'handleMondayCallback']);
