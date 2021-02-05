var PublicSample = function PublicSample(){
    return {
        log : function( args ){
            console.log( args );
        }
    };
};

var s = new PublicSample();

s.log( "Sample log function" );
