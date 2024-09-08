import request from '@/request/request.js';
import axios from "axios";
import { ElMessage } from 'element-plus';

const Service = {
    async makeRequest(url) {
        try {
            const res = await request.get(url);
            return res.data.data;
        } catch (error) {
            console.error(`Error fetching data: ${error.message}`);
            return null;
        }
    },
    async handleDelete(row,isUrl) {
        try {
            const res = await request.delete(`/api/${isUrl}/${row.id}`);
            if (res.data.code === 200) {
                ElMessage.success('删除成功');
                return true;
            } else {
                ElMessage.error('删除失败');
                return false;
            }
        } catch (error) {
            ElMessage.error(`删除失败: ${error.message}`);
            return false;
        }
    },
    ImageFileTest(file) {
        if (file && file.size > 1024 * 1024 * 5) {
            ElMessage.error('上传图片大小不能超过 5MB');
            return false;
        } else {
            return true;
        }
    },
    VideoFileTest(file) {
        if (file && file.size > 1024 * 1024 * 1024 * 2) {
            ElMessage.error('上传图片大小不能超过 2GB');
            return false;
        } else {
            return true;
        }
    },
    handleExceedImage(files) {
        const file = files[0];
        if (file instanceof Blob) {
            file.url = URL.createObjectURL(file);
        } else {
            const reader = new FileReader();
            reader.onload = (event) => {
                const blob = new Blob([event.target.result], { type: file.type });
                file.url = URL.createObjectURL(blob);
            };
            reader.readAsArrayBuffer(file);
        }
        return file;
    },
    async submitForm(addForm, uploadImages, uploadVideos, isEditing,isUrl) {
        const select1 = isUrl == 'rcdhHt' ? addForm.num : isUrl == 'jcgyHt' ? addForm.year : false
        console.log(select1,isUrl)
        if (
            addForm &&
            addForm.name &&
            select1 &&
            addForm.word &&
            uploadImages.length > 0 &&
            uploadVideos.length > 0
        ) {
            const formData = new FormData();
            const imgFile = uploadImages[0].raw;
            const videoFile = uploadVideos[0].raw;

            formData.append('img', imgFile);
            formData.append('url', videoFile);
            formData.append('name', addForm.name);
            if (isUrl == 'rcdhHt') {
                formData.append('num', select1);
            } else if (isUrl == 'jcgyHt') {
                formData.append('year', select1);
            }
            formData.append('word', addForm.word);

            if (isEditing) {
                formData.append('id', addForm.id);
                return this.performUpdateRequest(formData,isUrl);
            } else {
                return this.performCreateRequest(formData,isUrl);
            }
        } else {
            ElMessage.warning('请填写完整信息并上传图片和视频');
            return false;
        }
    },
    async handleStatusChange(row, isUrl) {
            if (confirm(`确定要${row.status === 1 ? '下架' : '上架'}该内容吗？`)) {
                const newStatus = row.status === 1 ? 0 : 1;
                try {
                    const res = await request.put(`/api/${isUrl}/status?status=${newStatus}&id=${row.id}`);
                    if (res.data.code === 200) {
                        ElMessage.success('更新成功');
                        // 更新本地数据中的状态
                        row.status = newStatus;
                    } else {
                        ElMessage.error('更新失败');
                    }
                } catch (error) {
                    ElMessage.error(`更新失败: ${error.message}`);
                }
            }
    },
    async performUpdateRequest(formData,isUrl) {
        try {
            const res = await axios.put(`/api/${isUrl}/update`, formData, {
                'Content-Type': 'multipart/form-data',
            });
            if (res.data.code === 200) {
                ElMessage.success('更新成功');
                return true;
            } else {
                ElMessage.error('更新失败');
                return false;
            }
        } catch (error) {
            ElMessage.error('更新请求错误：', error);
            return false;
        }
    },
    async performCreateRequest(formData,isUrl) {
        try {
            const res = await axios.post(`/api/${isUrl}/create`, formData, {
                'Content-Type': 'multipart/form-data',
            });
            if (res.data.code === 200) {
                ElMessage.success('添加成功');
                return true;
            } else {
                ElMessage.error('添加失败');
                return false;
            }
        } catch (error) {
            ElMessage.error('创建请求错误：', error);
            return false;
        }
    }
};

export default Service;