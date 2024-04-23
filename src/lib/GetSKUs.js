export const GetSKUs = async (url) => {
  let res = await fetch(url)
    .then(r => r.text())

  const r =  /(?<=<script[^>]*>)([\s\S]*?)(?=<\/script>)/g
  let matches = res.match(r)
  
  let content
  for(let match of matches){
    match.includes("jsonConfig") && (content = match)
  }

  if(content){
    let obj = JSON.parse(content)
    let conf = obj["[data-role=swatch-options]"]["Magento_Swatches/js/swatch-renderer"].jsonConfig
    let opts = conf.attributes[124].options

    return opts.map((opt) => {
      return {
        label: opt.label,
        sku: conf.sku[opt.products[0]].slice(4),
      }
    })

  } else {

    const _r = /data-product-sku="([^"]*)"/
    let _matches = res.match(_r)
    
    if(_matches[1]){
      return [
        {
          label: '',
          sku: _matches[1].slice(4),
        }
      ]
    }
  }
}