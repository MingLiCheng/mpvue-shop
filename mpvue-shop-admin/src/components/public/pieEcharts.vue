<template>
  <div class="page">
    <div id="pie" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import echarts from "echarts";
export default {
  data() {
    return {
      chart: null,
      lifeNum: 0,
      eletronNum: 0,
      bookNum: 0,
      otherNum: 0
    };
  },
  components: {},
  mounted() {
    // this.getGoodsKindNum();
    this.initChart()
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById("pie"));
      console.log("图", this.lifeNum);
      this.chart.setOption({
        title: {
          text: "产品分类数据",
          x:"right"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: ["水果蔬菜", "肉禽蛋品", "海鲜水产", "素食冷冻","粮油食品"]
        },
        color:['#d3f3a8', '#f7e2e1','#bfe9db','#a3d4d1','#EE9572'],
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["30%", "50%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: "outside"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "18",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: [
              { value: 32, name: "水果蔬菜" },
              { value: 10, name: "肉禽蛋品" },
              { value: 14, name: "海鲜水产" },
              { value: 8, name: "素食冷冻" },
              { value: 25, name: "粮油食品" }
            ]
          }
        ]
      });
    },
    getGoodsKindNum() {
      let that = this;
      this.axios
        .post("/api/goods/getKindNumber", {
          kindId: "生活用品"
        })
        .then(res => {
          this.lifeNum = res.data.data.list.length;
          console.log(this.lifeNum);
          console.log("生活用品", res);
          this.axios
            .post("/api/goods/getKindNumber", {
              kindId: "数码电子"
            })
            .then(res => {
              this.eletronNum = res.data.data.list.length;
              console.log(this.eletronNum);
              console.log("数码电子", res);
              this.axios
                .post("/api/goods/getKindNumber", {
                  kindId: "图书文学"
                })
                .then(res => {
                  this.bookNum = res.data.data.list.length;
                  console.log(this.bookNum);
                  console.log("图书文学", res);
                  this.axios
                    .post("/api/goods/getKindNumber", {
                      kindId: "其他"
                    })
                    .then(res => {
                      this.otherNum = res.data.data.list.length;
                      console.log(this.otherNum);
                      console.log("其他", res);
                      that.initChart();
                    });
                });
            });
        });
    }
  }
};
</script>

<style scoped lang="less">
</style>
