      //북마크   
     function bookmark(){
         if(window.sidebar && window.sidebar.addPanel){
            window.sidebar.addPanel("미니멀",'http://intern20.dothome.co.kr/shop/',"");

        }else{
             if(window.external && ("AddFavorite" in window.external)){
                     window.external.AddFavorite('http://intern20.dothome.co.kr/shop/','미니멀')
             }else{
                    alert('주소창에 [Ctrl+D]를 누르시면 즐겨찾기에 등록 하실 수 있습니다.');
                   }
             }
        }
    
    $(function(){
        /*상품 검색 파트*/
        $('#searchBtn').click(function(){
            if($('#searchInput').val()==""){
            alert('검색할 상품명을 입력하세요.');
            $('#searchInput').focus();
            return false;
            }
        }); 
        
        $('#toQaPage').click(function(){
            location.href="./qa.html";
        });

        $('#toEventPage').click(function(){
            location.href="./event.html";
        });
     });