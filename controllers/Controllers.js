const paginate = require('express-paginate')
const fs = require('fs')
let data = fs.readFileSync('./mock_data.json')
data = JSON.parse(data)

/**
 * @constant
 * @route Get /companies
 * @default
 */

const GetCompaniesList = (_req, res) => {
  if (!data.length) {
    res.status(404).json({
      success: false,
      message: 'No companies found'
    })
  }

  return res.status(200).json({
    success: true,
    message: 'Companies\'s list',
    numberCompanies: data.length,
    data: data

  })
}

/**
 * @constant
 * @route Get /companies/paginate
 * @default
 */

const GetCompaniesListByPages = (req, res) => {
  const pageCount = Math.ceil(data.length / req.query.limit)
  const startIndex = (req.query.page - 1) * req.query.limit
  const endIndex = req.query.page * req.query.limit

  if (!data.length) {
    res.status(404).json({
      success: false,
      message: 'No companies found'
    })
  }

  return res.status(200).json({
    success: true,
    message: 'Companies\'s list',
    numberCompanies: data.length,
    pageCount,
    pages: paginate.getArrayPages(req)(pageCount, pageCount, req.query.page),
    data: data.slice(startIndex, endIndex)

  })
}
/**
 * @constant
 * @route Get /company/siren/:sirenNumber
 * @default
 */

const GetCompanyBySirenNumber = (req, res) => {
  const { sirenNumber } = req.params
  const dataCompany = data.filter((company) => {
    const { siren } = company

    return (
      JSON.stringify(siren) === sirenNumber
    )
  })

  if (!dataCompany.length) {
    res.status(404).json({
      success: false,
      message: `No company found with the siren number: ${sirenNumber}`
    })
  }
  return res.status(200).json({
    success: true,
    message: 'Company\'s data',
    data: dataCompany
  })
}

/**
 * @constant
 * @route Get /company/:sector
 * @default
 */

const ensureQueryIsLowerCase = (query) => query.toLowerCase()

const GetCompaniesBySector = (req, res) => {
  const dataCompany = data.filter((company) => {
    let { sector } = company
    sector = ensureQueryIsLowerCase(company.sector)
    return (
      sector === ensureQueryIsLowerCase(req.params.sector)
    )
  })

  if (!dataCompany.length) {
    res.status(404).json({
      success: false,
      message: `No company found with the following sector: ${req.params.sector}`
    })
  }

  return res.status(200).json({
    success: true,
    message: 'Companies\'s data',
    data: dataCompany
  })
}

/**
 * @constant
 * @route Post /company
 * @default
 */

const checkCompanyWithName = (name) => {
  return data.filter((company) => {
    return company.name === name
  })
}
const checkCompanyWithSiren = (siren) => {
  return data.filter((company) => {
    return company.siren === Number(siren)
  })
}

const checkIsValidValue = (values, res) => values.map((value, index) => {
  const property = Object.keys(values[index])
  return (
    isNaN(value[property]) &&
            res.status(400).json({
              error: `Veuillez définir uniquement des chiffres pour le champ: ${Object.keys(values[index])} `
            })
  )
})

const AddNewCompany = (req, res) => {
  const {
    name, sector, siren, ca, margin, ebitda, loss, year
  } = req.body

  let isCompanyExistWithName = checkCompanyWithName(name)
  let isCompanyExistWithSiren = checkCompanyWithSiren(siren)

  isCompanyExistWithName = isCompanyExistWithName.length
  isCompanyExistWithSiren = isCompanyExistWithSiren.length

  const isCompanyNotExistWithThisName = !isCompanyExistWithName
  const isCompanyNotExistWithThisSiren = !isCompanyExistWithSiren
  const isNotAnyErrors = isCompanyNotExistWithThisName && isCompanyNotExistWithThisSiren && !isNaN(siren) && !isNaN(ca) && !isNaN(margin) && !isNaN(ebitda) && !isNaN(loss) && !isNaN(year)

  if (!name) {
    res.status(400).json({ error: 'Veuillez définir le nom de l\'entreprise' })
  }
  if (!sector) {
    res.status(400).json({ error: 'Veuillez définir le secteur de l\'entreprise' })
  }
  if (!ca || !margin || !ebitda || !loss || !year) {
    res.status(400).json({ error: 'Veuillez remplir les champs manquants de la section results' })
  }

  if (!siren) {
    res.status(400).json({ error: 'Veuillez définir le numéro de siren' })
  }

  if (isNaN(siren)) {
    res.status(400).json({ error: 'Veuillez définir uniquement des chiffres pour le numéro de siren' })
  }

  if (isCompanyExistWithName) { res.status(400).json({ error: `Une entreprise avec le nom: ${name} existe déjà!` }) }

  if (isCompanyExistWithSiren) { res.status(400).json({ error: `Une entreprise avec le siren: ${siren} existe déjà!` }) }

  const values = [
    { ca: Number(ca) },
    { margin: Number(margin) },
    { ebitda: Number(ebitda) },
    { loss: Number(loss) },
    { year: Number(year) }
  ]
  checkIsValidValue(values, res)

  const newCompany = {
    name,
    sector,
    siren: Number(siren),
    results: [{
      ca: Number(ca),
      margin: Number(margin),
      ebitda: Number(ebitda),
      loss: Number(loss),
      year: Number(year)
    }]
  }

  if (isNotAnyErrors) {
    data.push(newCompany)
    fs.writeFileSync('./mock_data.json', JSON.stringify(data))
    return res.status(200).json({
      success: true,
      message: `The Company ${newCompany.name} was succesfull added`,
      company: newCompany
    })
  }
}

/**
 * @constant
 * @route Put /company/siren/:sirenNumber
 * @default
 */

const UpdateCompany = (req, res) => {
  const { siren } = req.params

  const {
    sector,
    ca,
    margin,
    ebitda,
    loss,
    year
  } = req.body

  const values = [
    { ca: Number(ca) },
    { margin: Number(margin) },
    { ebitda: Number(ebitda) },
    { loss: Number(loss) },
    { year: Number(year) }
  ]

  let isCompanyFoundWithSiren = checkCompanyWithSiren(siren)
  const isCompanyNotExistWithThisSiren = !isCompanyFoundWithSiren.length

  if (isNaN(siren)) {
    res.status(400).json({ error: 'Veuillez définir uniquement des chiffres pour le numéro de siren' })
  }
  if (isCompanyNotExistWithThisSiren) {
    throw new Error(res.status(404).json({ error: 'Pas d\'entreprise trouvé avec ce numéro de siren' }))
  }

  let companyToUpdate

  isCompanyFoundWithSiren.map((company) => {
    companyToUpdate = company
    return companyToUpdate
  })

  const theCompanyName = companyToUpdate.name
  const bilan = companyToUpdate.results

  isCompanyFoundWithSiren = isCompanyFoundWithSiren.length
  const indexOfCompanyToUpdate = data.findIndex((company) => company.siren === Number(siren))

  if (!sector) {
    res.status(400).json({ error: 'Veuillez définir le secteur de l\'entreprise' })
  }

  if (!ca || !margin || !ebitda || !loss || !year) {
    res.status(400).json({ error: 'Veuillez remplir les champs manquants de la section results' })
  }

  checkIsValidValue(values, res)

  const companyWillUpdate = {
    name: theCompanyName,
    sector,
    siren: Number(siren),
    results: [...bilan]
  }

  const newResult = {
    ca: Number(ca),
    margin: Number(margin),
    ebitda: Number(ebitda),
    loss: Number(loss),
    year: Number(year)
  }

  const indexOfResultToUpdate = bilan.findIndex((result) => result.year === Number(year))
  const isNewResultToAdd = indexOfResultToUpdate === -1
  const isResultToUpdate = indexOfResultToUpdate !== -1

  if (isNewResultToAdd) {
    companyWillUpdate.results.push(newResult)
  }

  if (isResultToUpdate) {
    companyWillUpdate.results[indexOfResultToUpdate] = newResult
  }
  const isNotAnyErrors = isCompanyFoundWithSiren && !isNaN(siren) && !isNaN(ca) && !isNaN(margin) && !isNaN(ebitda) && !isNaN(loss) && !isNaN(year) && isNaN(sector)

  if (isNotAnyErrors) {
    data[indexOfCompanyToUpdate] = companyWillUpdate

    fs.writeFileSync('./mock_data.json', JSON.stringify(data))
    return res.status(200).json({
      success: true,
      message: `The Company ${theCompanyName} was succesfull updated`,
      company: companyWillUpdate
    })
  }
}

/**
 * @constant
 * @route Delete /company/siren/:sirenNumber
 * @default
 */

const DeleteCompanyBySirenNumber = (req, res) => {
  const { sirenNumber } = req.params
  let isCompanyExistWithSiren = checkCompanyWithSiren(sirenNumber)

  isCompanyExistWithSiren = isCompanyExistWithSiren.length
  const isCompanyNotExistWithThisSiren = !isCompanyExistWithSiren

  if (isNaN(sirenNumber)) {
    res.status(400).json({ error: 'Veuillez définir un numéro de siren valide, ne contenant que des chiffres' })
  }
  if (isCompanyNotExistWithThisSiren) {
    res.status(404).json({
      success: false,
      message: `The company with the siren number: ${sirenNumber} do not exist`
    })
  }

  const updatedList = data.filter((company) => {
    const { siren } = company
    return (
      siren !== Number(sirenNumber)
    )
  })

  fs.writeFileSync('./mock_data.json', JSON.stringify(updatedList))

  return res.status(200).json({
    success: true,
    message: `The company with the siren number: ${sirenNumber} was successfull deleted`

  })
}

module.exports = {
  GetCompaniesList,
  GetCompaniesListByPages,
  GetCompanyBySirenNumber,
  GetCompaniesBySector,
  AddNewCompany,
  UpdateCompany,
  DeleteCompanyBySirenNumber
}
