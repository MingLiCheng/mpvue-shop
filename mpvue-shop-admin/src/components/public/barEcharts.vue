<template>
  <div class="page">
    <div id="bar" style="width:100%;height:100%;"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import echarts from "echarts"
export default {
  data() {
    return {
      chart: null
    };
  },
  components: {},
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById("bar"))
      this.chart.setOption({
        title: {
          text: "各月浏览数据"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["浏览量"]
        },
        color:'#9fd5e0',
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "浏览量",
            type: "bar",
            data: [
              30,
              50,
              106,
              123,
              238,
              342,
              109,
              166,
              466,
              876,
              1009,
              2009
            ],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          },
          
        ]
      })
    }
  }
};
</script>

<style lang="less">
</style>
