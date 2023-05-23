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
  
    // 定义分布范围
    var ranges_hp = {
      "0-60": 0,
      "60-90": 0,
      "90-110": 0,
      "110+": 0
    };
  
    var ranges_attack = {
      "0-60": 0,
      "60-90": 0,
      "90-110": 0,
      "110+": 0
    };
  
    var ranges_defense = {
      "0-60": 0,
      "60-90": 0,
      "90-110": 0,
      "110+": 0
    };
  
    var ranges_spattack = {
      "0-60": 0,
      "60-90": 0,
      "90-110": 0,
      "110+": 0
    };
  
    var ranges_spdefense = {
      "0-60": 0,
      "60-90": 0,
      "90-110": 0,
      "110+": 0
    };
  
    var ranges_speed = {
      "0-60": 0,
      "60-90": 0,
      "90-110": 0,
      "110+": 0
    };
  
    // 统计各范围内的数量
    hpValues.forEach(function(value) {
      if (value <= 60) {
        ranges_hp["0-60"]++;
      } else if (value <= 90) {
        ranges_hp["60-90"]++;
      } else if (value <= 110) {
        ranges_hp["90-110"]++;
      } else {
        ranges_hp["110+"]++;
      }
    });
  
    attackValues.forEach(function(value) {
      if (value <= 60) {
        ranges_attack["0-60"]++;
      } else if (value <= 90) {
        ranges_attack["60-90"]++;
      } else if (value <= 110) {
        ranges_attack["90-110"]++;
      } else {
        ranges_attack["110+"]++;
      }
    });
  
    defenseValues.forEach(function(value) {
      if (value <= 60) {
        ranges_defense["0-60"]++;
      } else if (value <= 90) {
        ranges_defense["60-90"]++;
      } else if (value <= 110) {
        ranges_defense["90-110"]++;
      } else {
        ranges_defense["110+"]++;
      }
    });
  
    specialAttackValues.forEach(function(value) {
      if (value <= 60) {
        ranges_spattack["0-60"]++;
      } else if (value <= 90) {
        ranges_spattack["60-90"]++;
      } else if (value <= 110) {
        ranges_spattack["90-110"]++;
      } else {
        ranges_spattack["110+"]++;
      }
    });
  
    specialDefenseValues.forEach(function(value) {
      if (value <= 60) {
        ranges_spdefense["0-60"]++;
      } else if (value <= 90) {
        ranges_spdefense["60-90"]++;
      } else if (value <= 110) {
        ranges_spdefense["90-110"]++;
      } else {
        ranges_spdefense["110+"]++;
      }
    });
  
    speedValues.forEach(function(value) {
      if (value <= 60) {
        ranges_speed["0-60"]++;
      } else if (value <= 90) {
        ranges_speed["60-90"]++;
      } else if (value <= 110) {
        ranges_speed["90-110"]++;
      } else {
        ranges_speed["110+"]++;
      }
    });
  
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
  
    // 创建饼图
    var data_HP = [{
      values: plot_HP.map(function(d) { return d.value; }),
      labels: plot_HP.map(function(d) { return d.label; }),
      type: "pie"
    }];
  
    var data_Attack = [{
      values: plot_Attack.map(function(d) { return d.value; }),
      labels: plot_Attack.map(function(d) { return d.label; }),
      type: "pie"
    }];
  
    var data_Special_Attack = [{
      values: plot_Special_Attack.map(function(d) { return d.value; }),
      labels: plot_Special_Attack.map(function(d) { return d.label; }),
      type: "pie"
    }];
  
    var data_Defense = [{
      values: plot_Defense.map(function(d) { return d.value; }),
      labels: plot_Defense.map(function(d) { return d.label; }),
      type: "pie"
    }];
  
    var data_Special_Defense = [{
      values: plot_Special_Defense.map(function(d) { return d.value; }),
      labels: plot_Special_Defense.map(function(d) { return d.label; }),
      type: "pie"
    }];
  
    var data_Speed = [{
      values: plot_Speed.map(function(d) { return d.value; }),
      labels: plot_Speed.map(function(d) { return d.label; }),
      type: "pie"
    }];
  
    // 定义布局
    var layout_HP = {
      title: "HP Stats Distribution",
      height: 400,
      width: 500
    };
  
    var layout_Attack = {
      title: "Attack Stats Distribution",
      height: 400,
      width: 500
    };
  
    var layout_Special_Attack = {
      title: "Special Attack Stats Distribution",
      height: 400,
      width: 500
    };
  
    var layout_Defense = {
      title: "Defense Stats Distribution",
      height: 400,
      width: 500
    };
  
    var layout_Special_Defense = {
      title: "Special Defense Stats Distribution",
      height: 400,
      width: 500
    };
  
    var layout_Speed = {
      title: "Speed Stats Distribution",
      height: 400,
      width: 500
    };
  
    // 绘制图表
    Plotly.newPlot("HP_distribution", data_HP, layout_HP);
    Plotly.newPlot("Attack_distribution", data_Attack, layout_Attack);
    Plotly.newPlot("Special_Attack_distribution", data_Special_Attack, layout_Special_Attack);
    Plotly.newPlot("Defense_distribution", data_Defense, layout_Defense);
    Plotly.newPlot("Special_Defense_distribution", data_Special_Defense, layout_Special_Defense);
    Plotly.newPlot("Speed_distribution", data_Speed, layout_Speed);
  });
  