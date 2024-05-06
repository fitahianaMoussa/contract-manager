<?php

namespace App\Utils;

class PasswordGenerator
{
    public static function generate(int $length = 8)
    {
        $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:<>?';

        $charLength = strlen($chars);

        $password = '';

        for ($i = 0; $i < $length; $i++) {
            $password .= $chars[rand(0, $charLength - 1)];
        }

        return $password;
    }
}
