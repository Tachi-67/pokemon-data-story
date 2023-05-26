d3.csv('pokemon.csv').then(function(pokemonData) {
    // 在此处继续处理数据和生成图表的逻辑

    // 将CSV数据解析为数字类型
    pokemonData.forEach(function(d) {
      d.hp = +d.hp;
      d.generation = +d.generation;
      d.base_total = +d.base_total;
      d.attack = +d.attack;
      d.defense = +d.defense;
      d.sp_attack = +d.sp_attack;
      d.sp_defense = +d.sp_defense;
      d.speed = +d.speed;
    });

    // 获取每个generation的平均值
    var generations = d3.nest()
      .key(function(d) { return d.generation; })
      .rollup(function(values) {
        return {
          base_total: d3.mean(values, function(d) { return d.base_total; }),
          attack: d3.mean(values, function(d) { return d.attack; }),
          defense: d3.mean(values, function(d) { return d.defense; }),
          sp_attack: d3.mean(values, function(d) { return d.sp_attack; }),
          sp_defense: d3.mean(values, function(d) { return d.sp_defense; }),
          speed: d3.mean(values, function(d) { return d.speed; })
        };
      })
      .entries(pokemonData);

    // 默认选择的属性
    var selectedAttribute = 'base_total';

    // 创建图表数据
    var data = [{
      x: generations.map(function(d) { return d.key; }),
      y: generations.map(function(d) { return d.value[selectedAttribute]; }),
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
    Plotly.newPlot('gen_chart', data, layout);

    // 监听属性选择器的变化
    d3.select('#attribute-select').on('change', function() {
      selectedAttribute = this.value;

      // 更新图表数据
      data[0].y = generations.map(function(d) { return d.value[selectedAttribute]; });
      layout.title = 'Average Pokemon ' + selectedAttribute.replace('_', ' ').toUpperCase() + ' by Generation';

      // 更新图表
      Plotly.update('gen_chart', data, layout);
    });
  });