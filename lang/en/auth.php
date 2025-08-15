<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Authentication Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines are used during authentication for various
    | messages that we need to display to the user. You are free to modify
    | these language lines according to your application's requirements.
    |
    */

    'failed'                    => 'These credentials do not match our records.',
    'password'                  => 'The provided password is incorrect.',
    'throttle'                  => 'Too many login attempts. Please try again in :seconds seconds.',

    'forgot_password'           => [
        'title'                    => 'Forgot Password',
        'description'              => 'No worries. Enter your email to receive a link and reset your password — so you can get back to growing in faith and staying connected.',
        'send_password_reset_link' => 'Send password reset link',
    ],

    'login'                     => [
        'title'       => 'Login to your account',
        'description' => 'Sign in to access devotionals, messages, and resources that strengthen your walk with God.',
    ],

    'register'                  => [
        'title'       => 'Create your account',
        'description' => 'Access messages, devotionals, and more. Create your account to stay inspired and spiritually connected.',
    ],

    'reset_password'            => [
        'title'       => 'Reset Password',
        'description' => 'Create a new password to restore access to your account and continue your walk in faith with our gospel community.',
    ],

    'confirm_password'          => [
        'title'       => 'Confirm your password',
        'description' => 'Please re-enter your password to make sure everything is secure and ready for your faithful journey ahead.',
    ],

    'verify_email'              => [
        'title'                     => 'Email Verification',
        'description'               => 'Please check your inbox and verify your email to activate your account and begin your journey of faith with us.',
        'link_sent'                 => 'A new verification link has been sent to the email address you provided during registration.',
        'resend_verification_email' => 'Resend Verification Email',
    ],

    'two_factor'                => [
        'title'             => 'Two-Factor Confirmation',
        'description'       => 'For your security, please enter the code sent to your device. This extra step helps keep your account safe as you grow in faith with our community.',
        'use_code'          => 'Use an authentication code',
        'use_recovery_code' => 'Use a recovery code',
        'status'            => [
            'recovery_code' => 'Please confirm access to your account by entering one of your emergency recovery codes.',
            'code'          => 'Please confirm access to your account by entering the authentication code provided by your authenticator application.',
        ],
    ],

    'placeholders'              => [
        'register'        => [
            'name'     => 'Your fullname',
            'username' => 'Amazing username',
            'email'    => 'Your best email',
            'password' => 'Strong password',
        ],
        'login'           => [
            'username' => 'Your email or username',
            'password' => 'Your strong password',
        ],
        'forgot_password' => [
            'email' => 'Your registered email',
        ],
        'reset_password'  => [
            'password'         => 'Create password',
            'confirm_password' => 'Repeat password',
        ],
        'two_factor'      => [
            'code'          => 'Enter code',
            'recovery_code' => 'Enter recovery code',
        ],
    ],

    'dont_have_account'         => [
        'title'       => 'Don\'t have an account?',
        'description' => 'Join our faith-filled community today. Create your free account to access devotionals, worship resources, Christian articles, and connect with believers around the world.',
    ],

    'already_registered'        => [
        'title'       => 'Already registered?',
        'description' => 'Log in to continue your journey of faith, explore new resources, and stay inspired by God’s Word.',
    ],

    'sign_in'                   => 'Login',
    'sign_up'                   => 'Register',

    'social'                    => [
        'login_with'    => 'Login with :provider',
        'register_with' => 'Register with :provider',
    ],

    'access_with_email'         => 'Access with email',
    'create_account_with_email' => 'Create account with email',
    'or_continue_with'          => 'Or continue with',

    'errors'                    => [
        'user_exists'        => 'Email or username has already been chosen. Try another one and stay strong in the purpose God has for you!',
        'login_failed'       => 'Login was canceled or unsuccessful. Please try again with faith and confidence!',
        'password_incorrect' => 'Hmm, that password doesn\'t seem right. Try again?',
    ],

    'why_seeing_page'           => 'Why am I seeing this page?',
];
