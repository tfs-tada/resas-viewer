/// <reference types="cypress" />
context('contents test', () => {
  let pref: any = null
  let singles: [any, any] = [null, null]
  beforeEach(() => {
    cy.visit('')
    cy.fixture('pref.json').then((e) => (pref = e))
    cy.fixture('single_1.json').then((e) => (singles[0] = e))
    cy.fixture('single_2.json').then((e) => (singles[1] = e))
  })
  describe('コンテンツ表示', () => {
    it('show - タイトル', () => {
      cy.get("[data-e2e='header-area']").within(() => {
        cy.contains('title')
      })
    })
    it('show - チェックボックス', () => {
      cy.get("[data-e2e='checkbox-area']").within(() => {
        console.log(pref)
        cy.contains(pref[0].prefName)
        cy.contains(pref[1].prefName)
      })
    })
    it('show - 未選択メッセージ', () => {
      cy.get("[data-e2e='nodata-area']").within(() => {
        cy.contains('表示したい都道府県を選択してください')
      })
    })
    it('show - グラフ表示', () => {
      cy.get("[data-e2e='checkbox-area']").within(() => {
        cy.contains(pref[0].prefName).click()
      })
      cy.get("[data-e2e='graph-area']").within(() => {
        cy.contains(pref[0].prefName)
        cy.contains(pref[1].prefName).should('not.exist')
      })
      cy.get("[data-e2e='checkbox-area']").within(() => {
        cy.contains(pref[1].prefName).click()
      })
      cy.get("[data-e2e='graph-area']").within(() => {
        cy.contains(pref[0].prefName)
        cy.contains(pref[1].prefName)
      })
      cy.get("[data-e2e='checkbox-area']").within(() => {
        cy.contains(pref[0].prefName).click()
      })
      cy.get("[data-e2e='graph-area']").within(() => {
        cy.contains(pref[0].prefName).should('not.exist')
        cy.contains(pref[1].prefName)
        cy.contains('年度')
        cy.contains('人口数')
      })
    })
  })
})
