<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
// use DB;

class AuthController extends Controller
{

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:55',
            'email' => 'required|email|min:5|max:60|unique:users',
            'password' => 'required|confirmed'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Registration failed',
                'errors' => $validator->errors()
            ], 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Registration successful',
            'data' => []
        ], 200);
    }

    // public function Register(Request $request)
    // {

    //     $request->validate([
    //         'name' => "required|string",
    //         'email' => "required|email|unique:users",
    //         'password' => "required||confirmed"
    //     ]);
    //     $user = User::create([
    //         'name' => $request->name,
    //         'email' => $request->email,
    //         'password' => bcrypt($request->password)
    //     ]);

    //     return response()->json([
    //         "status" => true,
    //         'message' => "Registration Successfull",
    //         "data" => []
    //     ]);
    // }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|string',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid email or password',
                'errors' => $validator->errors()
            ], 400);
        }

        $user = User::where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            $token = $user->createToken('mytoken')->accessToken;

            return response()->json([
                'status' => true,
                'message' => 'Login successful',
                'token' => $token,
                'data' => []
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Invalid email or password'
            ], 401);
        }
    }
    // public function Login(Request $request)
    // {

    //     $request->validate([
    //         'email' => "required|email|string",
    //         'password' => "required"
    //     ]);
    //     $user = User::where("email", $request->email)->first();

    //     if (!empty($user)) {

    //         // User exists
    //         if (Hash::check($request->password, $user->password)) {

    //             // Password matched
    //             $token = $user->createToken('mytoken')->accessToken;

    //             return response()->json([
    //                 "status" => true,
    //                 "message" => "Login successful",
    //                 'token' => $token,
    //                 "data" => []
    //             ]);
    //         } else {
    //             return response()->json([
    //                 "status" => false,
    //                 'message' => 'Password didn`t match',
    //                 "data" => []
    //             ]);
    //         }
    //     } else {
    //         return response()->json([
    //             "status" => false,
    //             'message' => 'Invalid Email Or Password'
    //         ]);
    //     }
    // }





    public function profile()
    {
        $userData = auth()->user();
        return response()->json([
            "status" => true,
            'message' => "Profile information",
            "data" =>  $userData,
            "id" => auth()->user()->id

        ]);
    }





    public function Logout(Request $request)
    {

        $token = auth()->user()->token();
        $token->revoke();

        return response()->json([
            "status" => true,
            'message' => "User Logged out successfully"

        ]);
    }
}
