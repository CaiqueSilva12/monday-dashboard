<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\MondayAuthService;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    protected $mondayAuthService;

    public function __construct(MondayAuthService $mondayAuthService)
    {
        $this->mondayAuthService = $mondayAuthService;
    }

    // Step 1: Redirect user to Monday.com OAuth
    public function redirectToMonday()
    {
        return redirect($this->mondayAuthService->getAuthUrl());
    }

    // Step 2: Handle Monday.com OAuth callback
    public function handleMondayCallback(Request $request)
    {
        $tokenData = $this->mondayAuthService->exchangeCodeForToken($request->code);
        if (empty($tokenData['access_token'])) {
            return response()->json(['error' => 'Failed to get access token'], 400);
        }
        $profile = $this->mondayAuthService->getMondayUserProfile($tokenData['access_token']);
        if (!$profile || empty($profile['id'])) {
            return response()->json(['error' => 'Failed to fetch Monday.com profile'], 400);
        }
        $user = $this->mondayAuthService->findOrCreateUser($profile, $tokenData['access_token']);
        // Issue JWT token
        $jwt = JWTAuth::fromUser($user);
        // Redirect to frontend with token as query param
        return redirect("http://localhost:3000/dashboard?token={$jwt}");
    }
} 