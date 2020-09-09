<template>
  <div class="page">
    <div id="line" style="width:100%;height:100%;"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import echarts from "echarts";
export default {
  data() {
    return {
      chart: null
    };
  },
  components: {},
  mounted() {
    this.initCharts();
  },
  methods: {
    initCharts() {
      this.chart = echarts.init(document.getElementById("line"));
      this.chart.setOption({
        title: {
          text: "订单情况"
        },
        tooltip: {
          trigger: "axis"
        },
        color:'#db6945',
        legend: {
          data: ["订单总量"],
          right:20
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "订单总量",
            type: "line",
            stack: "总量",
            data: [1, 2, 7, 1, 5, 10, 8]
          }
        ]
      });
    }
  }
};
</script>

<style lang="less">
</style>
