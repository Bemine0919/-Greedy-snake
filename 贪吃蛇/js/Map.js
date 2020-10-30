function Map(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    // 存储小方格节点
    this.arr = [];
    // 地图框架
    this.frame = document.createElement('div');
}

// 渲染地图
Map.prototype.renderMap = function() {
    this.frame.style.marginLeft = (document.documentElement.clientWidth / 2 ) - 375 + 'px';
    for (let i = 0; i < this.rows; i++) {
        // 创建行节点
        let row = document.createElement('div');
        row.style.display = 'flex'
        // 定义行数组
        let rowArr = [];
        for (let j = 0; j < this.cols; j++) {
            // 创建列节点
            let col = document.createElement('span');
            col.style.width = 30 + 'px';
            col.style.height = 30 + 'px';
            col.style.border = '1px solid black';
            row.appendChild(col);
            rowArr.push(col);
        }
        this.arr.push(rowArr)
        this.frame.appendChild(row)
    }
    // 上树
    document.body.appendChild(this.frame)
}