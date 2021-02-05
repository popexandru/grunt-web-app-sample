var AdminSample = function AdminSample(){
    return {
        log : function( args ){
            console.log( args );
        }
    };
};

var s = new AdminSample();

s.log( "Sample log function" );
