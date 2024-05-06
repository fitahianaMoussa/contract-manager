<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenue sur Assuramis!</title>
</head>

<body style="font-family: Arial, sans-serif;">
    <main>
        <div style="max-width: 512px; margin: 0 auto; padding: 20px; line-height: 24px; color: #1f2937;">
            <p>Cher Partenaire,</p>
            <p>Faisons suite à votre demande, nous avons le plaisir de vous communiquer ci-dessous vos codes d'accès à notre application:</p>
            <div style="max-width: 384px; margin: 0 auto">
                <h3 style="width: 100%; padding: 4px; text-align: center; background-color: #22c55e; color: #ffffff;">Lien de l'application</h3>
                <p>Conservez et utilisez les identifiants ci-dessous pour vous connectez à l'application en cliquant <a href="{{$appLink}}" target="_blank">ici</a></p>
                <h3 style="width: 100%; padding: 4px; text-align: center; background-color: #22c55e; color: #ffffff;">Vos identifiants</h3>
                <p>Adresse mail: {{$userEmail}}</p>
                <p>Mot de passe: {{$userPassword}}</p>
            </div>
            <p>Cordialement,</p>
            <p>L'équipe d'Assuramis</p>
            <div>
                <div style="width: 100%; padding: 8px; text-align: center; background-color: #22c55e; color: #ffffff;">
                    &copy; {{date('Y')}} Assuramis. Tous droits réservés..
                </div>
            </div>
        </div>
    </main>
</body>

</html>