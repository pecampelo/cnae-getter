const axios = require('axios')
const { json } = require('express')

exports.getByCNAE = async (cnae) => {
  // let companies = []
  // let thereAreCompanies = true
  // let companyPage = 1

  // do {
  //   console.log(companyPage)
  //   let newCompaniesData = await getPage(cnae, companyPage)
  //   if (json.status !== 200) {
  //     thereAreCompanies = false
  //   }
  //   let newCompanyData = newCompaniesData.data

  //   if (!newCompanyData) {
  //     thereAreCompanies = false
  //   }

  //   let newCompanies = newCompanyData.cnpj
  //   let foundCompany = companies.find((company) => company.cnpj === newCompanies[0].cnpj)

  //   if (foundCompany) {
  //     thereAreCompanies = false
  //   } else {
  //     companies.concat(newCompanies)
  //     companyPage = companyPage + 1
  //     await new Promise((r) => setTimeout(r, 500))
  //   }
  // } while (thereAreCompanies === true)
  let companies = await getPage(cnae, 1)
  return companies
}

const getPage = async (cnae, companyPage) => {
  let url = "https://api.casadosdados.com.br/v2/public/cnpj/search"
  let data = {
    query: {
      atividade_principal: [ 
        cnae 
      ]
    },
    page: companyPage
  }  

  try {
    console.log(JSON.stringify(data))
    let response = await axios.options(
      url,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "Origin": "https://casadosdados.com.br",
          "Accept": "application/json",          
          "sec-fetch-mode": "cors",
          "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Mobile Safari/537.36",
        }
      }
    )
    let response2 = await axios.post(
      url,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "Origin": "https://casadosdados.com.br",
          "Accept": "application/json",          
          "sec-fetch-mode": "cors",
          "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Mobile Safari/537.36",
        }
      }
    )
    json = await response.json()
    return json && response.status === 200 ? json : []
  } catch (err) {
    console.log(`Error whilst consulting page ${companyPage}. Error: ${err}`)
    console.log(err)
  }

}