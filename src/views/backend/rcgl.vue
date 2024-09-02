<template>
    <div>
        <el-select
            v-model="selectedOption"
            style="width: 80px"
        >
            <el-option value="名称">名称</el-option>
            <el-option value="简介">简介</el-option>
        </el-select>
        <el-input
            v-model="search"
            style="width: 200px"
            placeholder="搜索"
        />
        <el-button type="primary" :icon="Search" @click="filterItems">搜索</el-button>
        <el-button type="primary" :icon="Document" @click="dialogFormVisible = true">添加</el-button>
    </div>
    <el-table :data="items" stripe height="80vh" style="width: 100% ; margin-bottom: 1%">
        <el-table-column type="index" width="50"/>
        <el-table-column prop="img" label="图片" width="100">
            <template #default="{ row }">
                <img :src="row.img" style=" width: 60px; height:80px; " :alt="row.name"/>
            </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" width="120"/>
        <el-table-column prop="status" label="状态" width="80">
            <template #default="{ row }">
                <el-tag :type="row.status === 1? 'success' : 'danger'">
                    {{ row.status === 1? '展示' : '已下架' }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="num" label="集数" width="80"/>
        <el-table-column prop="word" label="简介" width="600"/>
        <el-table-column prop="url" label="视频链接" width="120"/>
        <el-table-column fixed="right" label="操作" min-width="160">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                    编辑
                </el-button>
                <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.row)"
                >
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="pageTotal"
    />
    <el-dialog v-model="dialogFormVisible" title="添加视频" width="40vw">
        <el-form :model="addForm">
            <el-form-item label="名称" >
                <el-input  autocomplete="off" v-model="addForm.name"/>
            </el-form-item>
            <el-form-item label="集数" >
                <el-input  v-model="addForm.num"/>
            </el-form-item>
            <el-form-item label="简介" >
                <el-input  v-model="addForm.word" type="textarea"/>
            </el-form-item>
            <!-- 添加图片上传组件 -->
            <el-form-item label="图片">
                <el-upload
                    action="#"
                    list-type="picture-card"
                    :auto-upload="false"
                    :limit="1"
                >
                    <el-icon><Plus /></el-icon>

                    <template #file="{ file }">
                        <div>
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                            <span class="el-upload-list__item-actions">
                <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                >
                  <el-icon><zoom-in /></el-icon>
                </span>
                <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                >
                  <el-icon><Download /></el-icon>
                </span>
                <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                >
                  <el-icon><Delete /></el-icon>
                </span>
              </span>
                        </div>
                    </template>
                </el-upload>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="submitForm">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="dialogVisible" title="预览图片">
        <img :style="{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain' }" :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
</template>

<script>
import request from '@/request/request.js';
import { Document, Search, Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";

export default {
    name: "rcgl",
    computed: {
        Search() {
            return Search;
        },
        Document() {
            return Document;
        },
    },
    data() {
        return {
            items: [],
            pageIndex: 1,
            pageSize: 10,
            pageTotal: 0,
            search: '',
            selectedOption: '名称',
            dialogFormVisible: false,
            addForm: {
                name: '',
                num: '',
                word: '',
            },
            disabled: false,
            dialogImageUrl: '',
            dialogVisible: false,
        };
    },
    methods: {
        // 封装请求函数
        async makeRequest(url) {
            try {
                const res = await request.get(url);
                this.items = res.data.data.rows;
                this.pageTotal = res.data.data.total;
            } catch (error) {
                // 添加错误提示
                this.$message.error('Error fetching data: ' + error.message);
            }
        },
        requestArticleList(pageNum, option, searchText) {
            let url = `/api/rcdhHt/searchByMore?pageNum=${pageNum}&pageSize=${this.pageSize}`;
            if (option && searchText) {
                const queryParam = option === '名称'? 'name' : option === '简介'? 'word' : null;
                if (queryParam) {
                    url += `&${queryParam}=${encodeURIComponent(searchText)}`;
                }
            }
            // 调用封装的请求函数
            this.makeRequest(url);
        },
        handleCurrentChange(newPage) {
            this.pageIndex = newPage;
            this.requestArticleList(this.pageIndex, this.selectedOption, this.search);
        },
        filterItems() {
            this.requestArticleList(this.pageIndex, this.selectedOption, this.search);
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(row) {
            request.delete(`/api/rcdhHt/${row.id}`).then((res) => {
                if (res.data.code === 200) {
                    this.$message.success('删除成功');
                    this.requestArticleList(this.pageIndex);
                } else {
                    this.$message.error('删除失败');
                }
            }).catch((error) => {
                this.$message.error('删除失败: ' + error.message)
            })
        },
        handleRemove(file) {
            console.log(file);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleDownload(file) {
            console.log(file);
        },
        submitForm() {
            // 检查是否有上传的图片
            if (this.addForm && this.addForm.name && this.addForm.num && this.addForm.word && this.uploadedFile) {
                // 构建请求数据对象
                const formData = new FormData();
                formData.append('name', this.addForm.name);
                formData.append('num', this.addForm.num);
                formData.append('word', this.addForm.word);
                formData.append('img', this.uploadedFile.raw);

                // 发送 POST 请求
                request.post('/api/rcdhHt/create', formData).then((res) => {
                    if (res.data.code === 200) {
                        this.$message.success('添加成功');
                        this.dialogFormVisible = false;
                        this.requestArticleList(this.pageIndex);
                    } else {
                        this.$message.error('添加失败');
                    }
                }).catch((error) => {
                    this.$message.error('添加失败: ' + error.message)
                });
            } else {
                this.$message.warning('请填写完整信息并上传图片');
            }
        },
    },
    created() {
        this.requestArticleList(this.pageIndex);
    },
};
</script>

<style scoped>

</style>