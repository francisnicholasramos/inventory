import {pool} from './pool';

async function test() {
    await pool.query("INSERT INTO category (category_name) VALUES ('Test')")
}

console.log(test())
