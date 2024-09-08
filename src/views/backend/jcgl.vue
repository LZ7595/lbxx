<template>
    <div>
        <el-select v-model="selectedOption" style="width: 80px">
            <el-option value="名称">名称</el-option>
            <el-option value="简介">简介</el-option>
        </el-select>
        <el-input v-model="search" style="width: 200px" placeholder="搜索"/>
        <el-button type="primary" :icon="Search" @click="filterItems">搜索</el-button>
        <el-button type="primary" :icon="Document" @click="dialogFormVisible = true">添加</el-button>
        <el-table :data="items" stripe height="80vh" style="width: 100%; margin-bottom: 1%">
            <el-table-column type="index" width="50"/>
            <el-table-column prop="img" label="图片" width="100">
                <template #default="{ row }">
                    <img :src="row.img" style="width: 60px; height: 80px;" :alt="row.name"/>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="名称" width="120"/>
            <el-table-column prop="status" label="状态" width="80">
                <template #default="{ row }">
                    <el-tag :type="row.status === 1? 'success' : 'danger'" @click="handleStatusChange(row)" style="cursor: pointer">
                        {{ row.status === 1 ? '展示' : '已下架' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="year" label="上映" width="80"/>
            <el-table-column prop="word" label="简介" width="600"/>
            <el-table-column prop="url" label="视频链接" width="120"/>
            <el-table-column fixed="right" label="操作" min-width="160">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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
        <el-dialog v-model="dialogFormVisible" :title="dialogTitle" width="40vw" @close="handleShut">
            <el-form :model="addForm">
                <!-- 添加图片上传组件 -->
                <el-form-item label="图片">
                    <el-upload
                            action="#"
                            v-model:file-list="uploadImages"
                            list-type="picture-card"
                            :auto-upload="false"
                            :limit="1"
                            :on-exceed="handleExceedImage"
                            accept="image/*"
                            @change="ImageFileTest"
                    >
                        <el-icon>
                            <Plus/>
                        </el-icon>
                        <template #file="{ file }">
                            <div>
                                <img
                                        class="el-upload-list__item-thumbnail"
                                        :src="file.url"
                                        alt=""
                                />
                                <span class="el-upload-list__item-actions">
                  <span
                          class="el-upload-list__item-preview"
                          @click="handlePictureCardPreview(file)"
                  >
                    <el-icon><zoom-in/></el-icon>
                  </span>
                  <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleRemoveImage(file)"
                  >
                    <el-icon><Delete/></el-icon>
                  </span>
                </span>
                            </div>
                        </template>
                    </el-upload>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input autocomplete="off" v-model="addForm.name"/>
                </el-form-item>
                <el-form-item label="集数">
                    <el-input v-model="addForm.year"/>
                </el-form-item>
                <el-form-item label="简介">
                    <el-input v-model="addForm.word" type="textarea"/>
                </el-form-item>
                <el-form-item label="视频">
                    <el-upload
                            v-model:file-list="uploadVideos"
                            class="upload-demo"
                            action="#"
                            :auto-upload="false"
                            accept="video/*"
                            @change="VideoFileTest"
                    >
                        <el-button type="primary">选择文件</el-button>
                        <template #tip>
                            <div class="el-upload__tip">files with a size less than 2GB</div>
                        </template>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="submitForm">确认提交</el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog v-model="dialogVisible" title="预览图片">
            <img
                    :style="{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain' }"
                    :src="dialogImageUrl"
                    alt="Preview Image"
            />
        </el-dialog>
    </div>
</template>

<script>
import Service from '@/request/Service.js'; // 引入封装后的服务文件
import {Document, Search, Delete, Plus, ZoomIn} from '@element-plus/icons-vue'; // 引入图标

export default {
    name: 'jcgl',
    computed: {
        Search() {
            return Search;
        },
        Document() {
            return Document;
        },
        dialogTitle() {
            return this.isEditing ? '编辑视频' : '添加视频';
        }
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
                year: '',
                word: '',
            },
            disabled: false,
            dialogImageUrl: '',
            dialogVisible: false,
            uploadImages: [],
            uploadVideos: [],
            isEditing: false,
            shouldCloseDialog: false,
            isFirstOpen: true,
            isUrl:'jcgyHt'
        };
    },
    methods: {
        Emptyform() {
            this.addForm = {};
            this.uploadImages = [];
            this.uploadVideos = [];
            this.dialogFormVisible = false;
        },
        async requestArticleList(pageNum, option, searchText) {
            let url = `/api/jcgyHt/searchByMore?pageNum=${pageNum}&pageSize=${this.pageSize}`;
            if (option && searchText) {
                const queryParam = option === '名称' ? 'name' : option === '简介' ? 'word' : null;
                if (queryParam) {
                    url += `&${queryParam}=${encodeURIComponent(searchText)}`;
                }
            }
            // 调用 Service 中的 makeRequest 方法
            const data = await Service.makeRequest(url);
            if (data) {
                this.items = data.rows;
                this.pageTotal = data.total;
            }
        },
        handleCurrentChange(newPage) {
            this.pageIndex = newPage;
            return this.requestArticleList(this.pageIndex, this.selectedOption, this.search);
        },
        filterItems() {
            return this.requestArticleList(this.pageIndex, this.selectedOption, this.search);
        },
        handleStatusChange(row){
            return Service.handleStatusChange(row,this.isUrl);
        },
        handleEdit(index, row) {
            // 将行数据填充到表单中
            this.addForm = {...row};
            this.uploadImages = [];
            if (row.img) {
                this.uploadImages.push({url: row.img});
            }
            this.uploadVideos = [];
            if (row.url) {
                this.uploadVideos.push({url: row.url});
            }
            this.isEditing = true;
            // 保存原始值
            this.originalFormName = row.name;
            this.originalFormYear = row.year;
            this.originalFormWord = row.word;
            this.originalUploadImages = this.uploadImages;
            this.originalUploadVideos = this.uploadVideos;
            this.dialogFormVisible = true;
            this.isFirstOpen = false; // 进入编辑状态时，不是首次打开
        },
        async handleDelete(row) {
            const success = await Service.handleDelete(row,this.isUrl);
            if (success) {
                await this.requestArticleList(this.pageIndex);
            }
        },
        ImageFileTest(file) {
            return Service.ImageFileTest(file);
        },
        VideoFileTest(file) {
            return Service.VideoFileTest(file);
        },
        handleRemoveVideo(file) {
            const index = this.uploadVideos.indexOf(file);
            if (index > -1) {
                this.uploadVideos.splice(index, 1);
            }
        },
        handleRemoveImage(file) {
            const index = this.uploadImages.indexOf(file);
            if (index > -1) {
                this.uploadImages.splice(index, 1);
            }
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleExceedImage(files) {
            const file = Service.handleExceedImage(files);
            this.uploadImages.push(file);
        },
        handleShut() {
            console.log(this.addForm, this.uploadImages[0], this.originalUploadImages);
            if (!this.shouldCloseDialog) {
                if (
                    this.addForm &&
                    (this.addForm.name === '' ||
                        this.addForm.year === '' ||
                        this.addForm.word === '' ||
                        this.uploadImages.length > 0 ||
                        this.uploadVideos.length > 0)
                ) {
                    // 判断是否为编辑模式且值未改变
                    if (this.isEditing &&
                        (this.addForm.name === this.originalFormName &&
                            this.addForm.year === this.originalFormYear &&
                            this.addForm.word === this.originalFormWord &&
                            this.uploadImages === this.originalUploadImages &&
                            this.uploadVideos === this.originalUploadVideos)) {
                        this.Emptyform();
                        return;
                    }
                    // 如果是首次打开对话框且没有进入编辑状态，直接关闭
                    if (this.isFirstOpen && !this.isEditing) {
                        this.isFirstOpen = false
                        this.Emptyform();
                        return;
                    }
                    const wengti = confirm("是否为您保存所填内容？");
                    if (wengti) {
                        this.dialogFormVisible = false;
                    } else {
                        this.Emptyform();
                    }
                }
            }
            this.isEditing = false;
            console.log('对话框关闭被触发');
        },
        async submitForm() {
            const success = await Service.submitForm(
                this.addForm,
                this.uploadImages,
                this.uploadVideos,
                this.isEditing,
                this.isUrl
            );
            if (success) {
                this.shouldCloseDialog = true;
                this.dialogFormVisible = false;
                await this.requestArticleList(this.pageIndex);
            }
        }
    },
    created() {
        this.requestArticleList(this.pageIndex);
    },
};
</script>
