<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use App\Models\User;

class MondayAuthService
{
    public function getAuthUrl()
    {
        $query = http_build_query([
            'client_id' => env('MONDAY_CLIENT_ID'),
            'redirect_uri' => env('MONDAY_REDIRECT_URI'),
            'response_type' => 'code',
            'state' => csrf_token(),
        ]);
        return 'https://auth.monday.com/oauth2/authorize?' . $query;
    }

    public function exchangeCodeForToken($code)
    {
        $response = Http::asForm()->post('https://auth.monday.com/oauth2/token', [
            'client_id' => env('MONDAY_CLIENT_ID'),
            'client_secret' => env('MONDAY_CLIENT_SECRET'),
            'code' => $code,
            'redirect_uri' => env('MONDAY_REDIRECT_URI'),
            'grant_type' => 'authorization_code',
        ]);
        return $response->json();
    }

    public function getMondayUserProfile($accessToken)
    {
        $query = '{ me { id name email } }';
        $response = Http::withHeaders([
            'Authorization' => $accessToken,
            'Content-Type' => 'application/json',
        ])->post('https://api.monday.com/v2', [
            'query' => $query,
        ]);
        return $response->json('data.me');
    }

    public function findOrCreateUser($mondayProfile, $accessToken)
    {
        // Find user by monday_id or email
        $user = User::where('monday_id', $mondayProfile['id'])
            ->orWhere('email', $mondayProfile['email'])
            ->first();
        if (!$user) {
            $user = User::create([
                'name' => $mondayProfile['name'],
                'email' => $mondayProfile['email'],
                'monday_id' => $mondayProfile['id'],
                'monday_access_token' => $accessToken,
                // Set other fields as needed
            ]);
        } else {
            // Update access token if needed
            $user->update([
                'monday_access_token' => $accessToken,
            ]);
        }
        return $user;
    }
} 