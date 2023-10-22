function main(){
    fetch("https://ets-pemrograman-web-f.cyclic.app/scores/score", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => {
            if (!response.ok) {
                console.log(response);
                alert("Get data leaderboard failed");
            }
            return response.json();
        })
        .then((resp) => {
            console.log("resp from server ", resp);
            let data_sorted = resp.data;
            data_sorted.sort((a, b) => b.score - a.score);

            let tampilan = 3;

            for (let i = 0; i < tampilan; i++) {
                var newScore = document.createElement('div');
                newScore.innerHTML = `
                    <div class="mb-8">
                        <div class="text-gray-900 font-bold text-xl mb-2 text-center">${data_sorted[i].nama} - ${data_sorted[i].score}</div>
                    </div>
                `;

                var parentDiv = document.getElementById('container-leaderboard');

                parentDiv.appendChild(newScore);
            }


        })
        .catch((error) => {
            alert(error)
            console.log("error ", error);
        });
};