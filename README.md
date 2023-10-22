# Checkers

Identitas :

    Keyisa Raihan Illah Setiadi
    5025211002
    PWEB F

Making Checkers Web Game using HTML, CSS, Javascript, with Call API for Authentication and Leaderboard

1. Registrasi

   Register akan berada pada https://yotakeys.github.io/game-checkers-web/page/register.html

   Data harus berisi :

   - Email: Boleh menggunakan spasi, huruf besar dan kecil, serta boleh menggunakan angka dan simbol.
   - Password: Huruf besar minimal 1, angka minimal 1, huruf kecil minimal 1 dan simbol minimal 1.
   - Nama: Diisikan dengan nama lengkap

   Setelah berhasil register akan ada alert dan akan diarahkan ke login untuk login

2. Login

   Login akan berada pada https://yotakeys.github.io/game-checkers-web/page/login.html

   Masukkan email dan password yang sudah pernah terdaftar, Jika berhasil login maka akan mendapat alert lalu akan diarahkan ke game

3. Get Profile

   Dalam bermain game, user harus login terlebih dahulu, jika belum login akan diarahkan kembali ke page Login

   username yang login akan ditampilkan di atas board permainan

   authentication acces token disimpan dalam local storage.

4. Add Score

   Setiap permainan selesai, web akan meanggil API add score sesuai dengan score yang didapatkan user untuk diupload ke database

5. Get Score

   Leaderboard akan berada pada https://yotakeys.github.io/game-checkers-web/page/leaderboard.html

   Web akan memanggil API get Score lalu meng sort nya secara descending dan mendapatkan 3 teratas dari list untuk ditampilkan ke dalam leaderboard
