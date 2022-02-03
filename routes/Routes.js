const express = require('express')
const router = express.Router()
const Controllers = require('../controllers/Controllers')

/**
 * @swagger
 * /companies:
 *   get:
 *     tags:
 *       - Company-Controller
 *     summary: Get all companies data
 *     responses:
 *       200:
 *         description: The company list.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Notification
 *                 message:
 *                   type: string
 *                   description: The Company {name} was succesfull added
 *                 numberCompanies:
 *                   type: number
 *                   description: The number of companies
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The company's name.
 *                     sector:
 *                       type: string
 *                       description: The company's sector.
 *                     siren:
 *                       type: number
 *                       description: The company's siren.
 *                     results:
 *                       type: array
 *                       items:
 *                        type: object
 *                        properties:
 *                          ca:
 *                           type: number
 *                           description: The company's CA.
 *                          margin:
 *                           type: number
 *                           description: The company's margin.
 *                          ebitda:
 *                           type: number
 *                           description: The company's ebitda.
 *                          loss:
 *                           type: number
 *                           description: The company's loss.
 *                          year:
 *                           type: number
 *                           description: The company's year.
 *       404:
 *         description: No company found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                       description: Error
 *                     message:
 *                       type: string
 *                       description: No Company found
 */

router.get('/companies', Controllers.GetCompaniesList)

/**
 * @swagger
 * /companies/pages:
 *   get:
 *     tags:
 *       - Company-Controller
 *     summary: Get companies data by 10
 *     responses:
 *       200:
 *         description: The company list by 10.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Notification
 *                 message:
 *                   type: string
 *                   description: The Company {name} was succesfull added
 *                 numberCompanies:
 *                   type: number
 *                   description: The number of companies
 *                 pageCount:
 *                   type: number
 *                   description: The number of pages (numberCompanies / 10)
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The company's name.
 *                     sector:
 *                       type: string
 *                       description: The company's sector.
 *                     siren:
 *                       type: number
 *                       description: The company's siren.
 *                     results:
 *                       type: array
 *                       items:
 *                        type: object
 *                        properties:
 *                          ca:
 *                           type: number
 *                           description: The company's CA.
 *                          margin:
 *                           type: number
 *                           description: The company's margin.
 *                          ebitda:
 *                           type: number
 *                           description: The company's ebitda.
 *                          loss:
 *                           type: number
 *                           description: The company's loss.
 *                          year:
 *                           type: number
 *                           description: The company's year.
 *       404:
 *         description: No company found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                       description: Error
 *                     message:
 *                       type: string
 *                       description: No Company found
 */

router.get('/companies/pages', Controllers.GetCompaniesListByPages)

/**
 * @swagger
 * /companies/pages?page={page}&limit=10:
 *   get:
 *     tags:
 *       - Company-Controller
 *     summary: Get companies data by 10
 *     parameters:
 *       - in: path
 *         name: page
 *         required: true
 *         description: the page.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The company list by 10.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Notification
 *                 message:
 *                   type: string
 *                   description: The Company {name} was succesfull added
 *                 numberCompanies:
 *                   type: number
 *                   description: The number of companies
 *                 pageCount:
 *                   type: number
 *                   description: The number of pages (numberCompanies / 10)
 *                 pages:
 *                   type: array
 *                   description: The url of pages
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The company's name.
 *                     sector:
 *                       type: string
 *                       description: The company's sector.
 *                     siren:
 *                       type: number
 *                       description: The company's siren.
 *                     results:
 *                       type: array
 *                       items:
 *                        type: object
 *                        properties:
 *                          ca:
 *                           type: number
 *                           description: The company's CA.
 *                          margin:
 *                           type: number
 *                           description: The company's margin.
 *                          ebitda:
 *                           type: number
 *                           description: The company's ebitda.
 *                          loss:
 *                           type: number
 *                           description: The company's loss.
 *                          year:
 *                           type: number
 *                           description: The company's year.
 *       404:
 *         description: No company found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                       description: Error
 *                     message:
 *                       type: string
 *                       description: No Company found
 */

router.get('/companies/pages?page=:id&limit=10', Controllers.GetCompaniesListByPages)

/**
 * @swagger
 * /company/siren/{sirenNumber}:
 *   get:
 *     tags:
 *      - Company-Controller
 *     summary: Get informations of a company by its siren's number
 *     parameters:
 *       - in: path
 *         name: sirenNumber
 *         required: true
 *         description: Siren's number of the company.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The company.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Notification
 *                 message:
 *                   type: string
 *                   description: The Company {name} was succesfull added
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The company's name.
 *                     sector:
 *                       type: string
 *                       description: The company's sector.
 *                     siren:
 *                       type: number
 *                       description: The company's siren.
 *                     results:
 *                       type: array
 *                       items:
 *                        type: object
 *                        properties:
 *                          ca:
 *                           type: number
 *                           description: The company's CA.
 *                          margin:
 *                           type: number
 *                           description: The company's margin.
 *                          ebitda:
 *                           type: number
 *                           description: The company's ebitda.
 *                          loss:
 *                           type: number
 *                           description: The company's loss.
 *                          year:
 *                           type: number
 *                           description: The company's year.
 *       404:
 *         description: No company found with this siren's number
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                       description: Error
 *                     message:
 *                       type: string
 *                       description: No Company found
 */

router.get('/company/siren/:sirenNumber', Controllers.GetCompanyBySirenNumber)

/**
 * @swagger
 * /companies/{sector}:
 *   get:
 *     tags:
 *      - Company-Controller
 *     summary: Get list of companies by sector
 *     parameters:
 *       - in: path
 *         name: sector
 *         required: true
 *         description: insert a sector.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The company.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Notification
 *                 message:
 *                   type: string
 *                   description: The Company {name} was succesfull added
 *                 company:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The company's name.
 *                     sector:
 *                       type: string
 *                       description: The company's sector.
 *                     siren:
 *                       type: number
 *                       description: The company's siren.
 *                     results:
 *                       type: array
 *                       items:
 *                        type: object
 *                        properties:
 *                          ca:
 *                           type: number
 *                           description: The company's CA.
 *                          margin:
 *                           type: number
 *                           description: The company's margin.
 *                          ebitda:
 *                           type: number
 *                           description: The company's ebitda.
 *                          loss:
 *                           type: number
 *                           description: The company's loss.
 *                          year:
 *                           type: number
 *                           description: The company's year.
 *       404:
 *         description: No company found with this sector
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                       description: Error
 *                     message:
 *                       type: string
 *                       description: No Company found
 */

router.get('/companies/:sector', Controllers.GetCompaniesBySector)

/**
 * @swagger
 * /company:
 *   post:
 *     tags:
 *       - Company-Controller
 *     summary: add a new company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the company.
 *               siren:
 *                 type: number
 *                 description: Siren of the company.
 *               sector:
 *                 type: string
 *                 description: Sector of the company.
 *               ca:
 *                 type: number
 *                 description: The turnover's of the company.
 *               margin:
 *                 type: number
 *                 description: The margin's of the company.
 *               ebitda:
 *                 type: number
 *                 description: The ebitda's of the company.
 *               loss:
 *                 type: number
 *                 description: The loss's of the company.
 *               year:
 *                 type: number
 *                 description: The year's of the company.
 *     responses:
 *       200:
 *         description: The company.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Notification
 *                 message:
 *                   type: string
 *                   description: The Company {name} was succesfull added
 *                 company:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The company's name.
 *                     sector:
 *                       type: string
 *                       description: The company's sector.
 *                     siren:
 *                       type: number
 *                       description: The company's siren.
 *                     results:
 *                       type: array
 *                       items:
 *                        type: object
 *                        properties:
 *                          ca:
 *                           type: number
 *                           description: The company's CA.
 *                          margin:
 *                           type: number
 *                           description: The company's margin.
 *                          ebitda:
 *                           type: number
 *                           description: The company's ebitda.
 *                          loss:
 *                           type: number
 *                           description: The company's loss.
 *                          year:
 *                           type: number
 *                           description: The company's year.
 *       400:
 *         description: Invalid values
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     error:
 *                       type: string
 *                       description: Invalid values
 *                       example: Veuillez remplir les champs manquants
 */

router.post('/company', Controllers.AddNewCompany)

/**
 * @swagger
 * /company/siren/{siren}:
 *   put:
 *     tags:
 *       - Company-Controller
 *     summary: Update a company
 *     parameters:
 *       - in: path
 *         name: siren
 *         required: true
 *         description: Siren's number of the company.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sector:
 *                 type: string
 *                 description: Sector of the company.
 *               ca:
 *                 type: number
 *                 description: The turnover's of the company.
 *               margin:
 *                 type: number
 *                 description: The margin's of the company.
 *               ebitda:
 *                 type: number
 *                 description: The ebitda's of the company.
 *               loss:
 *                 type: number
 *                 description: The loss's of the company.
 *               year:
 *                 type: number
 *                 description: The year's of the company.
 *     responses:
 *       200:
 *         description: The company.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Notification
 *                 message:
 *                   type: string
 *                   description: The Company {name} was succesfull added
 *                 company:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The company's name.
 *                     sector:
 *                       type: string
 *                       description: The company's sector.
 *                     siren:
 *                       type: number
 *                       description: The company's siren.
 *                     results:
 *                       type: array
 *                       items:
 *                        type: object
 *                        properties:
 *                          ca:
 *                           type: number
 *                           description: The company's CA.
 *                          margin:
 *                           type: number
 *                           description: The company's margin.
 *                          ebitda:
 *                           type: number
 *                           description: The company's ebitda.
 *                          loss:
 *                           type: number
 *                           description: The company's loss.
 *                          year:
 *                           type: number
 *                           description: The company's year.
 *       400:
 *         description: Invalid values
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     error:
 *                       type: string
 *                       description: Invalid Siren number
 *                       example: Veuillez définir uniquement des chiffres pour le numéro de Siren
 *       404:
 *         description: No company found with the following siren number
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     error:
 *                       type: string
 *                       description: No Company found
 */

router.put('/company/siren/:siren', Controllers.UpdateCompany)

/**
 * @swagger
 * /company/siren/{sirenNumber}:
 *   delete:
 *     tags:
 *       - Company-Controller
 *     summary: Delete a company
 *     parameters:
 *       - in: path
 *         name: sirenNumber
 *         required: true
 *         description: Siren Number of the company.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The company is deleted successfull.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     success:
 *                       type: boolean
 *                       description: View of the company below
 *                     message:
 *                       type: string
 *                       description: View of the company below
 *       400:
 *         description: Invalid Siren number
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     error:
 *                       type: string
 *                       description: Invalid Siren number
 *       404:
 *         description: The company with this siren number do not exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                       description: Error
 *                     message:
 *                       type: string
 *                       description: The company with this siren number do not exist
 */
router.delete('/company/siren/:sirenNumber', Controllers.DeleteCompanyBySirenNumber)

module.exports = router
