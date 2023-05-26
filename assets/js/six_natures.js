Plotly.d3.csv("pokemon-data-updated.csv", function(err, data) {
  if (err) throw err;

  // 筛选出 Tier 等于 "OU" 的数据
  var filteredData = data.filter(function(d) {
    return d.Tier === "OU";
  });

  // 分组数值范围
  var groupRanges = ['0-60', '61-90', '91-100', '101-120', '120+'];

  // 初始化分组对象
  var groupedData = {};
  groupRanges.forEach(function(range) {
    groupedData[range] = {
      HP: 0,
      Attack: 0,
      Defense: 0,
      'Special Attack': 0,
      'Special Defense': 0,
      Speed: 0
    };
  });

  // 遍历筛选后的数据，根据数值范围进行分组
  filteredData.forEach(function(d) {
    var hp = +d.HP;
    var attack = +d.Attack;
    var defense = +d.Defense;
    var specialAttack = +d['Special Attack'];
    var specialDefense = +d['Special Defense'];
    var speed = +d.Speed;

    if (hp <= 60) {
      groupedData['0-60'].HP++;
    } else if (hp <= 90) {
      groupedData['61-90'].HP++;
    } else if (hp <= 100) {
      groupedData['91-100'].HP++;
    } else if (hp <= 120) {
      groupedData['101-120'].HP++;
    } else {
      groupedData['120+'].HP++;
    }

    if (attack <= 60) {
      groupedData['0-60'].Attack++;
    } else if (attack <= 90) {
      groupedData['61-90'].Attack++;
    } else if (attack <= 100) {
      groupedData['91-100'].Attack++;
    } else if (attack <= 120) {
      groupedData['101-120'].Attack++;
    } else {
      groupedData['120+'].Attack++;
    }

    if (defense <= 60) {
      groupedData['0-60'].Defense++;
    } else if (defense <= 90) {
      groupedData['61-90'].Defense++;
    } else if (defense <= 100) {
      groupedData['91-100'].Defense++;
    } else if (defense <= 120) {
      groupedData['101-120'].Defense++;
    } else {
      groupedData['120+'].Defense++;
    }

    if (specialAttack <= 60) {
      groupedData['0-60']['Special Attack']++;
    } else if (specialAttack <= 90) {
      groupedData['61-90']['Special Attack']++;
    } else if (specialAttack <= 100) {
      groupedData['91-100']['Special Attack']++;
    } else if (specialAttack <= 120) {
      groupedData['101-120']['Special Attack']++;
    } else {
      groupedData['120+']['Special Attack']++;
    }

    if (specialDefense <= 60) {
      groupedData['0-60']['Special Defense']++;
    } else if (specialDefense <= 90) {
      groupedData['61-90']['Special Defense']++;
    } else if (specialDefense <= 100) {
      groupedData['91-100']['Special Defense']++;
    } else if (specialDefense <= 120) {
      groupedData['101-120']['Special Defense']++;
    } else {
      groupedData['120+']['Special Defense']++;
    }

    if (speed <= 60) {
      groupedData['0-60'].Speed++;
    } else if (speed <= 90) {
      groupedData['61-90'].Speed++;
    } else if (speed <= 100) {
      groupedData['91-100'].Speed++;
    } else if (speed <= 120) {
      groupedData['101-120'].Speed++;
    } else {
      groupedData['120+'].Speed++;
    }

  });

  // 提取分组后的数据
  var hpValues = Object.values(groupedData).map(function(d) { return d.HP; });
  var attackValues = Object.values(groupedData).map(function(d) { return d.Attack; });
  var defenseValues = Object.values(groupedData).map(function(d) { return d.Defense; });
  var specialAttackValues = Object.values(groupedData).map(function(d) { return d['Special Attack']; });
  var specialDefenseValues = Object.values(groupedData).map(function(d) { return d['Special Defense']; });
  var speedValues = Object.values(groupedData).map(function(d) { return d.Speed; });

  // 创建直方图数据
  var hpData = {
    x: groupRanges,
    y: hpValues,
    type: 'bar',
    name: 'HP'
  };

  var attackData = {
    x: groupRanges,
    y: attackValues,
    type: 'bar',
    name: 'Attack'
  };

  var defenseData = {
    x: groupRanges,
    y: defenseValues,
    type: 'bar',
    name: 'Defense'
  };

  var specialAttackData = {
    x: groupRanges,
    y: specialAttackValues,
    type: 'bar',
    name: 'Special Attack'
  };

  var specialDefenseData = {
    x: groupRanges,
    y: specialDefenseValues,
    type: 'bar',
    name: 'Special Defense'
  };

  var speedData = {
    x: groupRanges,
    y: speedValues,
    type: 'bar',
    name: 'Speed'
  };

  // 创建布局配置
  var layout = {
    barmode: 'group',
    xaxis: { title: 'Stat Range' },
    yaxis: { title: 'Count' },
    title: 'Nature (Tier: OU)'
  };
    // 将数据和布局配置绘制成图表
    Plotly.newPlot('HP_chart', [hpData], layout);
    Plotly.newPlot('Attack_chart', [attackData], layout);
    Plotly.newPlot('Defense_chart', [defenseData], layout);
    Plotly.newPlot('Special_Attack_chart', [specialAttackData], layout);
    Plotly.newPlot('Special_Defense_chart', [specialDefenseData], layout);
    Plotly.newPlot('Speed_chart', [speedData], layout);
  });
  