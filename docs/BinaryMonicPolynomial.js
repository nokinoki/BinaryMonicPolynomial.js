//2元多モニック項式の配列クラス
BinaryMonicPolynomial = function (rank){
    this.rank = rank;
    //多項式を格納するプロパティ
    this.list = [];
    //既約多項式のキャッシュ
    this.irreducibler = [];
    var begin = 1 << rank;
    var end = (1 << rank + 1) - 1;
    for(var i = begin; i <= end; i++){
        this.list.push(i);
    }
    this.getIrreducible();
};

BinaryMonicPolynomial.prototype.toString = function(){
    var rtnStr = "";
    for(var i = 0; i < this.list.length; i++){
        rtnStr += this.list[i].toString(2) + "\n";
    }
    return rtnStr;
};

BinaryMonicPolynomial.prototype.irreduciblerToString = function(){
    var rtnStr = "";
    for(var i = 0; i < this.irreducibler.length; i++){
        rtnStr += this.irreducibler[i].toString(2) + "\n";
    }
    return rtnStr;
};

//多項式除算のローカルメソッド(x/y)
//x,yはそれぞれモニック多項式, 返り値は[商,剰余]の配列
//Memo:ひっ算をシミュレート
BinaryMonicPolynomial.prototype.polyDiv = function(x, xRank, y, yRank){
    //商の格納変数
    var quotient = 0;
    //徐式を被徐式に左で桁合わせ
    y = y << xRank - yRank;
    //元の徐式と被徐式が右で揃うまでループ
    for(var i = 0; i <= xRank - yRank; i++){
        //現在の被徐式の最上位桁が1なら割る
        if((x >> xRank - i) & 1 == 1){
            x ^= y;
            quotient += 1;
        }
        //徐式を一つ右にシフト
        y = y >> 1;
        //商は一つ左にシフト
        quotient = quotient << 1;
    }
    //for最後の余分なシフトを調整
    quotient = quotient >> 1;
    return [quotient, x];
}

//既約多項式を返すメソッド
BinaryMonicPolynomial.prototype.getIrreducible = function(){
    //キャッシュが無ければ計算する
    if(this.irreducibler.length == 0){
        //0,1次式なら自明に全てが既約
        if(this.rank <= 1){
            this.irreducibler = this.list;
            return this.irreducibler;
        }
        //x0乗の項が0のものはxで割り切れるためスキップできる
        //0,1,10,11,100,...と生成しているため偶数番目の式がこれにあたる
        BaseLoop: for(var i = 1; i < this.list.length; i = i + 2){
            //1次からrank/2次までのモニック多項式で割れないことを確認する
            //Memo:rank/2+1以降はそれまでの商として現れるはずなので省略可能
            for(var j = 1; j <= this.rank/2; j++){
                var poly = new BinaryMonicPolynomial(j);
                for(var k = 1; k < poly.list.length; k++){
                    //剰余が0（割り切れた）ならスキップ
                    if(this.polyDiv(this.list[i], this.rank, poly.list[k], j)[1] == 0){
                        continue BaseLoop;
                    }
                }
            }
            //全ての検査を通過したらirreduciblerに追加
            this.irreducibler.push(this.list[i]);
        }
    }
    return this.irreducibler
};

//おまけ
BinaryMonicPolynomial.prototype.graphicShow = function(canvas){
    
    var size = this.rank < 10? 20 : 5;
    var activColor = "violet";
    var disableColor ="lightcyan";

    canvas.width = (this.rank + 1) * size + 200;
    canvas.height = this.list.length * size;
    if(canvas.height < 200){
        canvas.height += 200;
    }
    var cgc = canvas.getContext("2d");

    cgc.font = "18px 'メイリオ'";
    cgc.fillStyle = activColor;
    cgc.fillRect((this.rank + 2) * size, size * 0.5, size, size);
    cgc.strokeRect((this.rank + 2) * size, size * 0.5, size, size);
    cgc.fillText("1*x^n", (this.rank + 3.5) * size, size * 1.3);
    cgc.fillStyle = disableColor;
    cgc.fillRect((this.rank + 2) * size, size * 1.5, size, size);
    cgc.strokeRect((this.rank + 2) * size, size * 1.5, size, size);
    cgc.fillText("0*x^n", (this.rank + 3.5) * size, size * 2.3);


    for(var i = 0; i < this.list.length; i++){
        for(var j = 0; j <= this.rank; j++){
            var color = (this.list[i] >> this.rank-j) & 1 == 1 ? activColor : disableColor;
            cgc.fillStyle = color;
            cgc.fillRect(j * size, i * size, size, size);
            cgc.strokeRect(j * size, i * size, size, size);
        }
    }

    for(var i = 0; i < this.list.length; i++){
        if(this.irreducibler.indexOf(this.list[i]) < 0){
            cgc.globalAlpha = 0.7;
            cgc.fillStyle = "#000";
            cgc.fillRect(0, i * size, (this.rank + 1) * size, size);
        }
    }
}