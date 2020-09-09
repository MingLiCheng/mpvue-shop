<template>
    <section class="pt-manage-wrapper">
        <div class="query-box">
            <div></div>
            <div><el-button type="primary" @click="addGroupBuy">发起一个拼团</el-button></div>
        </div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column label="id" width="60">
                <template slot-scope="scope">
                    <p>{{ scope.row.id }}</p>
                </template>
            </el-table-column>
            <el-table-column label="goods_id" width="100">
                <template slot-scope="scope">
                    <p>{{ scope.row.goods_id }}</p>
                </template>
            </el-table-column>
            <el-table-column label="goods_name">
                <template slot-scope="scope">
                    <p> {{ scope.row.name }}</p>
                </template>
            </el-table-column>
            <el-table-column label="groupbuy_name">
                <template slot-scope="scope">
                    <p> {{ scope.row.groupbuy_name || '-' }}</p>
                </template>
            </el-table-column>
            <el-table-column label="groupbuy_price" width="100">
                <template slot-scope="scope">
                    <p> {{ scope.row.groupbuy_price }}</p>
                </template>
            </el-table-column>

            <el-table-column label="user_ids">
                <template slot-scope="scope">
                    <p> {{ scope.row.user_ids.split(',').length }}</p>
                </template>
            </el-table-column>
            <el-table-column label="need_usernum">
                <template slot-scope="scope">
                    <p> {{ scope.row.need_usernum }}</p>
                </template>
            </el-table-column>
            <el-table-column label="retail_price">
                <template slot-scope="scope">
                    <p> {{ scope.row.retail_price }}</p>
                </template>
            </el-table-column>
            <el-table-column label="list_pic_url">
                <template slot-scope="scope">
                    <p class="banner-image-box"><img :src="scope.row.list_pic_url" alt="" srcset=""></p>
                </template>
            </el-table-column>
            <el-table-column label="end_time" width="130">
                <template slot-scope="scope">
                    {{scope.row.end_time | dateFormat}}
                </template>
            </el-table-column>

            <el-table-column label="操作" width="160">
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
            <AddGroupBuyDialog v-if="editDialogTableVisible" :visible.sync="editDialogTableVisible" :dialogObj="dialogObj" :baseInfo="selectBaseInfo" @refreshList="refreshList"></AddGroupBuyDialog>
        </el-dialog>

    </section>
</template>

<script>
import AddGroupBuyDialog from './components/AddGroupBuyDialog'
export default {
    components:{AddGroupBuyDialog},
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
        this.getptInfoList(this.form)
    },
    methods: {
        refreshList(){
            this.getptInfoList(this.form)
        },
        addGroupBuy(){
             this.selectBaseInfo = {
                 goods_id:'',
                groupbuy_name:'',
                need_usernum:'',
                groupbuy_price:'',
                end_time:'',
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
            this.selectBaseInfo = info
            this.editDialogTableVisible = true
        },
        handleDelete(index,info){
            this.$message.error('请联系管理员删除！')
        },
        sizeChange(value){
            this.form.size = value
            this.getGoodsListInfo(this.form)
        },
        currentChange(value){
            this.form.page = value
            this.getGoodsListInfo(this.form)
        },
        async getptInfoList(params){
                const res = await this.$axios.get('/list/ptInfoList',{params})
                console.log('res',res);
                if(res.data.list){
                    this.tableData = res.data.list
                    this.total = res.data.total
                }else{
                    this.tableData = []
                    this.total = 0
                }
            },
    },
}
</script>

<style lang="less">
.pt-manage-wrapper{
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