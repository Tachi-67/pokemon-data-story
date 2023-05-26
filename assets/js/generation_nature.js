// 使用fetch API加载CSV文件
fetch('pokemon.csv')
  .then(response => response.text())
  .then(csvData => {
    // 将CSV数据解析为数组
    var pokemonData = parseCSV(csvData);

    // 获取每个generation的平均值
    var generations = [...new Set(pokemonData.map(pokemon => pokemon.generation))];
    var averageStats = {};

    generations.forEach(generation => {
      var filteredPokemons = pokemonData.filter(pokemon => pokemon.generation === generation);
      var total = filteredPokemons.reduce((sum, pokemon) => sum + Number(pokemon.base_total), 0);
      var attack = filteredPokemons.reduce((sum, pokemon) => sum + Number(pokemon.attack), 0);
      var defense = filteredPokemons.reduce((sum, pokemon) => sum + Number(pokemon.defense), 0);
      var spAttack = filteredPokemons.reduce((sum, pokemon) => sum + Number(pokemon.sp_attack), 0);
      var spDefense = filteredPokemons.reduce((sum, pokemon) => sum + Number(pokemon.sp_defense), 0);
      var speed = filteredPokemons.reduce((sum, pokemon) => sum + Number(pokemon.speed), 0);
      var count = filteredPokemons.length;

      averageStats[generation] = {
        base_total: total / count,
        attack: attack / count,
        defense: defense / count,
        sp_attack: spAttack / count,
        sp_defense: spDefense / count,
        speed: speed / count
      };
    });

    // 默认选择的属性
    var selectedAttribute = 'base_total';

    // 创建图表数据
    var data = [{
      x: Object.keys(averageStats),
      y: Object.values(averageStats[selectedAttribute]),
      type: 'bar',
      name: selectedAttribute
    }];

    // 创建布局
    var layout = {
      title: 'Average Pokemon ' + selectedAttribute.replace('_', ' ').toUpperCase() + ' by Generation',
      xaxis: { title: 'Generation' },
      yaxis: { title: 'Average Value' }
    };

    // 生成图表
    Plotly.newPlot('chart', data, layout);

    // 监听属性选择器的变化
    document.getElementById('attribute-select').addEventListener('change', function(event) {
      selectedAttribute = event.target.value;

      // 更新图表数据
      data[0].y = Object.values(averageStats[selectedAttribute]);
      layout.title = 'Average Pokemon ' + selectedAttribute.replace('_', ' ').toUpperCase() + ' by Generation';

      // 更新图表
      Plotly.update('chart', data, layout);
    });
  });

// CSV解析函数
function parseCSV(csv) {
  var lines = csv.trim().split('\n');
  var headers = lines.shift().split(',');
  var result = [];

  lines.forEach(line => {
    var values = line.split(',');
    var obj = {};

    headers.forEach((header, index) => {
      obj[header] = values[index];
    });

    result.push(obj);
  });

  return result;
}
