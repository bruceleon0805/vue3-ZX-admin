<!-- <template>
    <el-pagination
				@size-change="onHandleSizeChange"
				@current-change="onHandleCurrentChange"
				class="mt15"
				:pager-count="5"
				:page-sizes="[10, 20, 30]"
				v-model:current-page="table.pagenum"
				background
				v-model:page-size="table.pagesize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="table.total"
			>
			</el-pagination>
</template>

<script setup lang="ts">
interface PageData{
    total:number,
    pageSize:number,
    pageNum:number,
}
const props = withDefaults(defineProps<PageData>(), {
    total: 0,
    pageSize: 10,
    pageNum: 1
})



const onHandleSizeChange = (val: number) => {
	props.pageSize = val;
	getTableData();
};
// 分页改变
const onHandleCurrentChange = (val: number) => {
	table.pagenum = val;
	getTableData();
};



</script>

<style scoped>

</style> -->