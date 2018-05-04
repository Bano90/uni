<?php
class word{
    function get($app,$params)
    {
        $db=new \DB\Jig('words/',\DB\Jig::FORMAT_JSON);
        $mapper=new \DB\Jig\Mapper($db,'words.json');
        $words=$mapper->find(Array('@id=?',$params['id']));
        $resault=[];
        foreach($words as $k=>$word){
            foreach($word as $a=>$b){
                if($a!="_id" && $word["id"]==$params["id"])
                {
                    $resault[$a]=$b;
                }
            }
        }
        $res = [];
        foreach($words as $k=>$word){
            if($word["id"]==$params["id"]){
                $r = [];
                foreach($word as $a=>$b){
                    if($a!="_id")
                        $r[$a] = $b;
                }
                array_push($res, $r);
            }
        }
        echo json_encode($res);
    }
    function post($app,$params) //felvétel
    {
        $data=json_decode($app['BODY']);
        echo json_encode($data);
        $db=new \DB\Jig('words/',\DB\Jig::FORMAT_JSON);
        $mapper=new \DB\Jig\Mapper($db,'words.json');
        $mapper->id=$data->id; //azonosító
        $mapper->category=$data->category; //kategória
        $mapper->english=$data->english; // szó angol jelentése
        $mapper->hungarian=$data->hungarian; // szó magyar jelentése
        $mapper->german=$data->german; // szó német jelentése
        $mapper->save();
        echo "OK";
        @unlink($data);
        @unlink($mapper);
        @unlink($db);
    }
    function put($app,$params) // módosítás
    {
        $data=json_decode($app['BODY']);
        $db=new \DB\Jig('words/',\DB\Jig::FORMAT_JSON);
        $mapper=new \DB\Jig\Mapper($db,'words.json');
        $word=$mapper->load(Array('@id=?',$params['id']));
        $word->category=$data->category; // kategória
        $word->english=$data->english; // szó angol jelentése
        $word->hungarian=$data->hungarian; // szó magyar jelentése
        $word->german=$data->german; // szó német jelentése
        $word->save();
        echo "OK";
        @unlink($data);
        @unlink($mapper);
        @unlink($db);
        @unlink($word);
    }
    function delete($app,$params) //törlés
    {
        $db=new \DB\Jig('words/',\DB\Jig::FORMAT_JSON);
        $mapper= new \DB\Jig\Mapper($db,'words.json');
        $word=$mapper->find(Array('@id=?',$params['id']));
        $word[0]->erase();
        echo "OK";
        @unlink($mapper);
        @unlink($db);
        @unlink($word);
    }
}
$app=require('C:\fatfree-master\lib\base.php');
$app->map('/word/@id','word');
/*$app->route('GET /word/@id/@date', function($app, $params){
    $db=new \DB\Jig('words/',\DB\Jig::FORMAT_JSON);
    $mapper=new \DB\Jig\Mapper($db,'words.json');
    $words=$mapper->find(Array('@id = ? and @days = ?',$params['id'], $params['date']));
        $res = [];
        foreach($words as $k=>$word){
            if($word["id"]==$params["id"]){
                $r = [];
                foreach($word as $a=>$b){
                    if($a!="_id")
                        $r[$a] = $b;
                }
                array_push($res, $r);
            }
        }
        echo json_encode($res);
});*/
// összes lekérdezése
$app->route('GET /allwords',function($app){
    $data=file_get_contents('words/words.json');
    $data=json_decode($data);
    $resault=[];
    foreach($data as $k=>$v){
        array_push($resault,$v);
    }
    echo json_encode($resault);
});
$app->run();
?>