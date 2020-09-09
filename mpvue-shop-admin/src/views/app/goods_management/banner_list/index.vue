<template>
    <section>
        <h1>导航信息管理</h1>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column label="id">
                <template slot-scope="scope">
                    <p>{{ scope.row.id }}</p>
                </template>
            </el-table-column>
            <!-- <el-table-column label="ad_position_id" width="180">
                <template slot-scope="scope">
                    <p>{{ scope.row.ad_position_id }}</p>
                </template>
            </el-table-column>
            <el-table-column label="media_type" width="180">
                <template slot-scope="scope">
                    <p> {{ scope.row.media_type }}</p>
                </template>
            </el-table-column> -->
            <el-table-column label="name">
                <template slot-scope="scope">
                    <p> {{ scope.row.name }}</p>
                </template>
            </el-table-column>
            <el-table-column label="link">
                <template slot-scope="scope">
                    <p> {{ scope.row.link }}</p>
                </template>
            </el-table-column>
            <el-table-column label="image_url" width="240">
                <template slot-scope="scope">
                    <p class="banner-image-box"><img :src="scope.row.image_url" alt="" srcset=""></p>
                </template>
            </el-table-column>
            <el-table-column label="content">
                <template slot-scope="scope">
                    <p> {{ scope.row.content }}</p>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog titel="详细信息" v-if="editDialogVisible" :visible.sync="editDialogVisible">
            <EditBannerInfo v-if="editDialogVisible" :visible.sync="editDialogVisible" :baseInfo="selectInfo" @refreshList="refreshList"></EditBannerInfo>
        </el-dialog>

    </section>
</template>


<script>
import  EditBannerInfo from './components/EditBannerInfo'
export default {
    components:{EditBannerInfo},
    data() {
        return {
            tableData: [],
            selectInfo:{},
            editDialogVisible: false,
        }
    },

    created() {
        this.getBannerListInfo()
    },

    methods: {
        async getBannerListInfo(){
            const res = await this.$axios.get('/goodsManagement/bannerList')
            console.log('res',res);
            if(res.data.list){
                this.tableData = res.data.list
            }else{
                this.tableData = []
            }
        },
        refreshList(){
            this.getBannerListInfo()
        },
        handleEdit(index, row) {
            console.log(index, row);
            this.selectInfo = row
            this.editDialogVisible = true
        },
        handleDelete(index, row) {
            console.log(index, row);
        }
    },
}
</script>

<style lang="less">
.banner-image-box{
    height: 100px;
    width: 200px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
    }
}
</style>