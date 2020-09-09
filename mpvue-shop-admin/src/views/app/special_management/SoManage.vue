<template>
    <section class="so-manage-wrapper">
        <div class="query-box">
            <div></div>
            <div><el-button type="primary" @click="addGroupBuy">添加特价商品</el-button></div>
        </div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column label="id">
                <template slot-scope="scope">
                    <p>{{ scope.row.id }}</p>
                </template>
            </el-table-column>
            <el-table-column label="goods_id">
                <template slot-scope="scope">
                    <p>{{ scope.row.goods_id }}</p>
                </template>
            </el-table-column>
            <el-table-column label="goods_name">
                <template slot-scope="scope">
                    <p> {{ scope.row.name }}</p>
                </template>
            </el-table-column>
            <el-table-column label="goods_brief">
                <template slot-scope="scope">
                    <p> {{ scope.row.goods_brief || '-' }}</p>
                </template>
            </el-table-column>

            <el-table-column label="special_goods_num">
                <template slot-scope="scope">
                    <p> {{ scope.row.special_goods_num }}</p>
                </template>
            </el-table-column>
            <el-table-column label="retail_price">
                <template slot-scope="scope">
                    <p> {{ scope.row.retail_price }}</p>
                </template>
            </el-table-column>
                        <el-table-column label="special_offer_price">
                <template slot-scope="scope">
                    <p style="color: #F56C6C;"> {{ scope.row.special_offer_price }}</p>
                </template>
            </el-table-column>

            <el-table-column label="list_pic_url">
                <template slot-scope="scope">
                    <p class="banner-image-box"><img :src="scope.row.list_pic_url" alt="" srcset=""></p>
                </template>
            </el-table-column>
            <el-table-column label="end_time">
                <template slot-scope="scope">
                    {{ new Date(+scope.row.end_time) | dateFormat}}
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="display: flex; justify-content: flex-end;">
            <el-pagination
            @size-change="sizeChange"
            @current-change="currentChange"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        </div>

        <el-dialog title="拼团详情" v-if="editDialogTableVisible" :visible.sync="editDialogTableVisible">
            <AddSpecilOfferGoodsDialog v-if="editDialogTableVisible" :visible.sync="editDialogTableVisible" :dialogObj="dialogObj" :baseInfo="selectBaseInfo" @refreshList="refreshList"></AddSpecilOfferGoodsDialog>
        </el-dialog>

    </section>
</template>

<script>
import AddSpecilOfferGoodsDialog from './components/AddSpecilOfferGoodsDialog'
import moment from 'moment'
export default {
    components:{AddSpecilOfferGoodsDialog},
    data() {
        return {
            tableData:[],
            total: 0,
            form:{
                page: 1,
                size: 10,
                isShowAll: 1,
            },
            editDialogTableVisible: false,
            dialogObj:{
                type: 'add'
            },
            selectBaseInfo:{}
        }
    },
    created() {
        this.specialOfferGoodslist(this.form)
    },
    methods: {
        refreshList(){
            this.specialOfferGoodslist(this.form)
        },
        addGroupBuy(){
             this.selectBaseInfo = {
                 goods_id: "",
                  special_offer_price: "",
                  special_goods_num:"",
                  end_time:''
             }
             this.dialogObj={
                type: 'add'
            }
            this.editDialogTableVisible = true
        },
        handleEdit(index,info){
            this.dialogObj = {
                type: 'edit'
            }
            this.selectBaseInfo = Object.assign({},info,{
              end_time: moment(new Date(+info.end_time)).format('YYYY-MM-DD HH:mm:ss')
            })
            this.editDialogTableVisible = true
        },
        handleDelete(index,info){
            this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$axios.post(
            "/specialOffer/delSpecialOfferGoods",
            { id: info.id }
          );
          if (res.data.code === 0) {
            this.$message.success("删除成功");
            this.refreshList();
          } else {
            this.$message.error("删除失败");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
        },
        sizeChange(value){
            this.form.size = value
            this.getGoodsListInfo(this.form)
        },
        currentChange(value){
            this.form.page = value
            this.getGoodsListInfo(this.form)
        },
        async specialOfferGoodslist(params){
                const res = await this.$axios.get('specialOffer/specialOfferGoodslist',{params})
                console.log('res',res);
                if(res.data.list){
                    this.tableData = res.data.list
                    this.total = res.data.total
                }else{
                    this.tableData = []
                    this.total = 0
                }
            },
        async delSpecialOfferGoods(params){
                const res = await this.$axios.post('specialOffer/delSpecialOfferGoods',params)
                console.log('res',res);
                if(res){

                }else{

                }
            },
    },
}
</script>

<style lang="less">
.so-manage-wrapper{
    .query-box{
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 20px;
    }
    .banner-image-box{
        // width: 100px;
        height: 60px;
        display: flex;
        justify-content: center;
        img{
            width: auto;
            height: auto;
            max-width: 100%;
            max-height: 100%;

        }
    }
}
</style>