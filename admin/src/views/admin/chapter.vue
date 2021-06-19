<template>
  <div>
    <p>
    <button v-on:click="add()" class="btn btn-white btn-default btn-round">
      <i class="ace-icon fa fa-refresh blue"></i>
      新增
    </button>
      &nbsp;
      <button v-on:click="list(1)" class="btn btn-white btn-default btn-round">
        <i class="ace-icon fa fa-refresh blue"></i>
        刷新
      </button>
    </p>
    <pagination ref="pagination" v-bind:list="list"></pagination>
    <table id="simple-table" class="table  table-bordered table-hover">
        <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>课程ID</th>
          <th>操作</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="chapter in chapters">
          <td>{{chapter.id}}</td>
          <td>{{chapter.name}}</td>
          <td>{{chapter.course}}</td>
          <td>
            <div class="hidden-sm hidden-xs btn-group">
              <button v-on:click="edit(chapter)" class="btn btn-xs btn-info">
                <i class="ace-icon fa fa-pencil bigger-120"></i>
              </button>

              <button v-on:click="del(chapter.id)" class="btn btn-xs btn-danger">
                <i class="ace-icon fa fa-trash-o bigger-120"></i>
              </button>
            </div>
<!--            hidden样式：响应式，小屏会缩起操作那几个键-->
          </td>
        </tr>
        </tbody>
      </table>

    <!--模态框-->
    <div id="modal-form" class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">表单</h4>
          </div>
          <div class="modal-body">
            <form class="form-horizontal">
              <div class="form-group">
                <label  class="col-sm-2 control-label">大章名称</label>
                <div class="col-sm-10">
                  <input type="text" v-model="chapter.name" class="form-control" placeholder="名称">
                </div>
              </div>
              <div class="form-group">
                <label  class="col-sm-2 control-label">课程ID</label>
                <div class="col-sm-10">
                  <input type="text" v-model="chapter.course" class="form-control" placeholder="课程ID">
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" v-on:click="save()" class="btn btn-primary">保存</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
  </div>
</template>

<script>
import Pagination from "../../components/pagination"

export default {
  components: {Pagination},
  name: "chapter",
  data: function (){
        return {
          chapter: {},
          chapters: []}
  },
  mounted() {
    //sidebar激活样式方法一
    //this.$parent.activeSidebar("business-chapter-
    let _this = this;
    _this.list(1);
  },
  methods: {
    add() {
      let _this = this;
      _this.chapter = {};   //数据绑定可以清空
      $("#modal-form").modal("show");
    },
    edit(chapter) {
      let _this = this;
      _this.chapter = $.extend({},chapter); //数据绑定，绑的是<tr v-for="chapter in chapters">的数据
      $("#modal-form").modal("show");

      //存在问题：表单数据和表格数据不一致，在表单做了修改，点取消应该undo修改
    },
    list(page) {
      let _this = this;
      _this.$ajax.post('http://localhost:9000/business/admin/chapter/list', {
        page: page,
        size: _this.$refs.pagination.size
      }).then((respond) => {
        console.log("查询大章结果：", respond);
        _this.chapters = respond.data.content.list;
        _this.$refs.pagination.render(page, respond.data.content.total);
      })
    },
    save() {
      let _this = this;
      _this.$ajax.post('http://localhost:9000/business/admin/chapter/save',
          _this.chapter).then((response) => {
        console.log("保存大章列表结果", response);
        if (response.data.success){
          $("#modal-form").modal("hide");
          _this.list(1);
        }

      })
    },
    del(id){
      let _this = this;
      _this.$ajax.delete('http://localhost:9000/business/admin/chapter/delete/' + id).then((res)=>{
              console.log("删除大章结果：",res);
              if (res.data.success){
                _this.list(1);
              }
          })
    }
  }
}
</script>

<style scoped>

</style>