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

    'failed'                    => 'Essas credenciais não correspondem aos nossos registros.',
    'password'                  => 'A senha fornecida está incorreta.',
    'throttle'                  => 'Muitas tentativas de login. Por favor, tente novamente em :seconds segundos.',

    'forgot_password'           => [
        'title'                    => 'Esqueceu a Senha',
        'description'              => 'Sem problemas. Digite seu e-mail para receber um link e redefinir sua senha — assim você pode continuar crescendo na fé e se mantendo conectado.',
        'send_password_reset_link' => 'Enviar link de redefinição de senha',
    ],

    'login'                     => [
        'title'       => 'Acesse sua conta',
        'description' => 'Faça login para acessar devocionais, mensagens e recursos que fortalecem sua caminhada com Deus.',
    ],

    'register'                  => [
        'title'       => 'Crie sua conta',
        'description' => 'Acesse mensagens, devocionais e muito mais. Crie sua conta para se manter inspirado e espiritualmente conectado.',
    ],

    'reset_password'            => [
        'title'       => 'Redefinir Senha',
        'description' => 'Crie uma nova senha para restaurar o acesso à sua conta e continuar sua caminhada de fé com nossa comunidade do evangelho.',
    ],

    'confirm_password'          => [
        'title'       => 'Confirme sua senha',
        'description' => 'Por favor, digite novamente sua senha para garantir que tudo esteja seguro e pronto para sua jornada fiel.',
    ],

    'verify_email'              => [
        'title'                     => 'Verificação de E-mail',
        'description'               => 'Por favor, verifique sua caixa de entrada e confirme seu e-mail para ativar sua conta e começar sua jornada de fé conosco.',
        'link_sent'                 => 'Um novo link de verificação foi enviado para o endereço de e-mail que você forneceu durante o registro.',
        'resend_verification_email' => 'Reenviar E-mail de Verificação',
    ],

    'two_factor'                => [
        'title'             => 'Confirmação em Duas Etapas',
        'description'       => 'Para sua segurança, insira o código enviado para o seu dispositivo. Esta etapa extra ajuda a manter sua conta segura enquanto você cresce na fé com nossa comunidade.',
        'use_code'          => 'Usar um código de autenticação',
        'use_recovery_code' => 'Usar um código de recuperação',
        'status'            => [
            'recovery_code' => 'Por favor, confirme o acesso à sua conta inserindo um dos seus códigos de recuperação de emergência.',
            'code'          => 'Por favor, confirme o acesso à sua conta inserindo o código de autenticação fornecido pelo seu aplicativo autenticador.',
        ],
    ],

    'placeholders'              => [
        'register'        => [
            'name'     => 'Seu nome completo',
            'username' => 'Nome de usuário incrível',
            'email'    => 'Seu melhor e-mail',
            'password' => 'Senha forte',
        ],
        'login'           => [
            'username' => 'Seu e-mail ou nome de usuário',
            'password' => 'Sua senha forte',
        ],
        'forgot_password' => [
            'email' => 'Seu e-mail cadastrado',
        ],
        'reset_password'  => [
            'password'         => 'Criar senha',
            'confirm_password' => 'Repetir senha',
        ],
        'two_factor'      => [
            'code'          => 'Digite o código',
            'recovery_code' => 'Digite o código de recuperação',
        ],
    ],

    'dont_have_account'         => [
        'title'       => 'Não tem uma conta?',
        'description' => 'Junte-se à nossa comunidade de fé hoje mesmo. Crie sua conta gratuita para acessar devocionais, recursos de adoração, artigos cristãos e se conectar com crentes ao redor do mundo.',
    ],

    'already_registered'        => [
        'title'       => 'Já tem uma conta?',
        'description' => 'Faça login para continuar sua jornada de fé, explorar novos recursos e se manter inspirado pela Palavra de Deus.',
    ],

    'sign_in'                   => 'Entrar',
    'sign_up'                   => 'Cadastrar-se',

    'social'                    => [
        'login_with'    => 'Entrar com :provider',
        'register_with' => 'Cadastrar-se com :provider',
    ],

    'access_with_email'         => 'Acessar com e-mail',
    'create_account_with_email' => 'Criar conta com e-mail',
    'or_continue_with'          => 'Ou continuar com',

    'errors'                    => [
        'user_exists'        => 'E-mail ou nome de usuário já foi escolhido. Experimente outro e siga firme no propósito que Deus tem pra você!',
        'login_failed'       => 'O login foi cancelado ou não teve sucesso. Tente novamente com fé e confiança!',
        'password_incorrect' => 'Hmm, essa senha não parece estar certa. Tentar de novo?',
    ],

    'why_seeing_page'           => 'Por que estou vendo está página?',
];
