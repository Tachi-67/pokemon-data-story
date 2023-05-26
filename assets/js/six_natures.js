// 从"pokemon-data-updated.csv"中获取数据
d3.csv("pokemon-data-updated.csv").then(function(data) {
    // 选择Tier等于OU的行
    var ouData = data.filter(function(d) {
      return d.Tier === "OU";
    });
  
    // 提取所需的属性列
    var hpValues = ouData.map(function(d) {
      return +d.HP;
    });
    var attackValues = ouData.map(function(d) {
      return +d.Attack;
    });
    var defenseValues = ouData.map(function(d) {
      return +d.Defense;
    });
    var specialAttackValues = ouData.map(function(d) {
      return +d["Special Attack"];
    });
    var specialDefenseValues = ouData.map(function(d) {
      return +d["Special Defense"];
    });
    var speedValues = ouData.map(function(d) {
      return +d.Speed;
    });
  
    var hpData = {
      x: hpValues,
      type: 'histogram',
      name: 'HP'
    };

    var attackData = {
      x: attackValues,
      type: 'histogram',
      name: 'Attack'
    };

    var defenseData = {
      x: defenseValues,
      type: 'histogram',
      name: 'Defense'
    };

    var specialAttackData = {
      x: specialAttackValues,
      type: 'histogram',
      name: 'Special Attack'
    };

    var specialDefenseData = {
      x: specialDefenseValues,
      type: 'histogram',
      name: 'Special Defense'
    };

    var speedData = {
      x: speedValues,
      type: 'histogram',
      name: 'Speed'
    };
  
    // 将分布转换为绘图数据
    var plot_HP = Object.keys(ranges_hp).map(function(key) {
      return { label: key, value: ranges_hp[key] };
    });
  
    var plot_Attack = Object.keys(ranges_attack).map(function(key) {
      return { label: key, value: ranges_attack[key] };
    });
  
    var plot_Special_Attack = Object.keys(ranges_spattack).map(function(key) {
      return { label: key, value: ranges_spattack[key] };
    });
  
    var plot_Defense = Object.keys(ranges_defense).map(function(key) {
      return { label: key, value: ranges_defense[key] };
    });
  
    var plot_Special_Defense = Object.keys(ranges_spdefense).map(function(key) {
      return { label: key, value: ranges_spdefense[key] };
    });
  
    var plot_Speed = Object.keys(ranges_speed).map(function(key) {
      return { label: key, value: ranges_speed[key] };
    });
  
    var layout = {
      barmode: 'overlay',
      xaxis: { title: 'Stat Value' },
      yaxis: { title: 'Count' },
      title: 'Pokemon Data Histogram'
    };

    // 将数据和布局配置绘制成图表
    Plotly.newPlot('HP_chart', [hpData], layout);
    Plotly.newPlot('Attack_chart', [attackData], layout);
    Plotly.newPlot('Defense_chart', [defenseData], layout);
    Plotly.newPlot('Special_Attack_chart', [specialAttackData], layout);
    Plotly.newPlot('Special_Defense_chart', [specialDefenseData], layout);
    Plotly.newPlot('Speed_chart', [speedData], layout);
  });
  