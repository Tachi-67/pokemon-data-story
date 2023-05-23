// 使用fetch函数异步加载数据集（pokemon-data-updated.csv）
fetch('pokemon-data-updated.csv')
    .then(response => response.text())
    .then(csvData => {
        // 解析CSV数据
        const rows = csvData.split('\n');
        const headers = rows[0].split(',');
        const data = rows.slice(1).map(row => {
            const values = row.split(',');
            return {
                Tier: values[0],
                HP: parseInt(values[1]),
                Attack: parseInt(values[2]),
                Defense: parseInt(values[3]),
                "Special Attack": parseInt(values[4]),
                "Special Defense": parseInt(values[5]),
                Speed: parseInt(values[6])
            };
        });

        // 获取六列数值
        const tiers = data.map(item => item.Tier);
        const hp = data.map(item => item.HP);
        const attack = data.map(item => item.Attack);
        const defense = data.map(item => item.Defense);
        const specialAttack = data.map(item => item["Special Attack"]);
        const specialDefense = data.map(item => item["Special Defense"]);
        const speed = data.map(item => item.Speed);

        // 创建数据集
        const chartData = {
            labels: tiers,
            datasets: [
                { label: 'HP', data: hp, backgroundColor: 'rgba(255, 99, 132, 0.5)' },
                { label: 'Attack', data: attack, backgroundColor: 'rgba(54, 162, 235, 0.5)' },
                { label: 'Defense', data: defense, backgroundColor: 'rgba(75, 192, 192, 0.5)' },
                { label: 'Special Attack', data: specialAttack, backgroundColor: 'rgba(255, 206, 86, 0.5)' },
                { label: 'Special Defense', data: specialDefense, backgroundColor: 'rgba(153, 102, 255, 0.5)' },
                { label: 'Speed', data: speed, backgroundColor: 'rgba(255, 159, 64, 0.5)' }
            ]
        };

        // 创建图表
        const ctx = document.getElementById('pokemonChart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                responsive: true,
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Tier'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Value'
                        }
                    }
                }
            }
        });
    });
