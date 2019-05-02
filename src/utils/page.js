// -----------------------------------------------------------分页模板-------------------------------------------------------------

module.exports = {
  show(items) {
    this.items = items;
    this.sumPage = Math.ceil(this.items.length / this.PageShowSum);
    //页面加载完成，默认加载第一页
    let page = Number(this.currentPage) + 1;
    this.showEachPage(page);
    print.log("当前数据总页为：--->", this.sumPage);
  },
  switchPage(page) {
    let p = page - 1;
    this.currentPage = `${p}`;
    print.log("当前-->", page);
    this.showEachPage(page);
  },
  showEachPage(page) {
    let all = this.items;
    this.showItems = [];
    for (
      let i = (page - 1) * this.PageShowSum; i < page * this.PageShowSum; i++
    ) {
      if (all[i] == null) {
        break;
      } else {
        this.showItems.push(all[i]);
      }
    }
  },
  nextPage() {
    if (this.currentPage == this.sumPage - 1) {
      s_alert.basic("已经到达最后一页了……");
    } else {
      let p = Number(this.currentPage) + 1;
      this.currentPage = `${p}`;
      print.log("当前-->", p + 1);
      this.showEachPage(p + 1);
    }
  },
  previousPage() {
    if (this.currentPage == "0") {
      s_alert.basic("已经到达最前面了……");
    } else {
      let p = Number(this.currentPage) - 1;
      this.currentPage = `${p}`;
      print.log("当前-->", p + 1);
      this.showEachPage(p + 1);
    }
  }
}
