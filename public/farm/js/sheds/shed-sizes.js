/* ===== BUILDING SIZES v2: a building covers w x h tiles (same table as the server). The barn is about 1 tile, so a cottage is barn size. A tile is about 2.5 metres (a person is half a tree tall). ===== */
var FOOT={h_mint:2,h_lav:2,h_farm:2,h_yellow:2,h_brick:2,h_tudor:2,h_chalet:2,h_barnh:2,h_townO:2,h_townG:2,h_terra:2,h_modern:3,h_lodge:3,h_white:3,h_towerh:2,h_lighthouse:2,h_manor:3,h_mansion:4,hh_grandfarm:3,hh_bahay:3,hh_villa:4,hh_lodge:4,hh_estate:4,hh_hotel:4,hh_palace:5,hh_castle:5,hh_skyscr:4,hh_mega:6,h_river:3,h_japanese:3,h_coastal:3,h_green:3,h_pavilion:3,h_french:3,h_swiss:3,h_desert:3,h_tropical:3,h_lakeside:4,h_clock:3,h_mill:3,h_oriental:3,h_victorian:4,h_courtyard:4,h_terrace:4,h_observatory:3,hh_skyvilla:4,h_mediterranean:4,hh_royalestate:5},FOOTR={bb_court:[11,6],bb_court2:[6,11]},BSC={};
function footW(k){return FOOTR[k]?FOOTR[k][0]:(FOOT[k]||1)}
function footH(k){return FOOTR[k]?FOOTR[k][1]:(FOOT[k]||1)}
function footN(k){return Math.max(footW(k),footH(k))}
