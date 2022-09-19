describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/')

    cy.url().should('equal', 'http://localhost:4200/')

    cy.get('input[name="category"]').should('have.value', '')
    cy.get('input[name="category"]').type('Pizza').should('have.value', 'Pizza')
    cy.get('input[name="brand"]').should('have.value', '')
    cy.get('.nutriscoreField').should('have.value', '')
    cy.intercept({method: 'GET',url: 'https://fr.openfoodfacts.org/cgi/**'}).as('getProduct')
    cy.get('.submit').click()

    cy.get('.spinner').should('exist')
    cy.wait('@getProduct')
    cy.url().should('equal', 'http://localhost:4200/product_list?category=Pizza&brand=&nutriscore=')
    cy.get('mat-select').click()
    cy.get('.allCard').children().should('have.length', 10)

    cy.intercept({method: 'GET',url: 'https://fr.openfoodfacts.org/cgi/**'}).as('getProduct5')
    cy.get('#mat-option-0').should('exist').click()
    cy.wait('@getProduct5')
    cy.get('.allCard').children().should('have.length', 5)

    cy.intercept({method: 'GET',url: 'https://fr.openfoodfacts.org/cgi/**'}).as('getProduct5Next')
    cy.get('.mat-paginator-navigation-next').should('exist').click()
    cy.wait('@getProduct5Next')
    cy.get('.allCard').children().should('have.length', 5)

    cy.intercept({method: 'GET',url: 'https://fr.openfoodfacts.org/cgi/**'}).as('getProductIndiv')
    cy.contains('Voir le détail').click()
    cy.wait('@getProductIndiv')
    cy.url().should('equal', 'http://localhost:4200/individual-product?id=10086988')
    cy.get('.allCard').children().should('have.length', 1)
    cy.contains('Food Info').click()

    cy.url().should('equal', 'http://localhost:4200/')
    cy.get('input[name="category"]').should('have.value', '')
    cy.get('input[name="brand"]').type('Danone').should('have.value', 'Danone')
    cy.get('input[name="brand"]').should('have.value', 'Danone')
    cy.get('.nutriscoreField').should('have.value', '')
    cy.intercept({method: 'GET',url: 'https://fr.openfoodfacts.org/cgi/**'}).as('getBrand')
    cy.get('.submit').click()

    cy.get('.spinner').should('exist')
    cy.wait('@getBrand')
    cy.url().should('equal', 'http://localhost:4200/product_list?category=&brand=Danone&nutriscore=')
    cy.get('.allCard').children().should('have.length', 10)
    cy.contains('Food Info').click()

    cy.get('input[name="category"]').should('have.value', '')
    cy.get('input[name="brand"]').should('have.value', '')
    cy.contains('.mat-radio-button', 'A').click()
    cy.intercept({method: 'GET',url: 'https://fr.openfoodfacts.org/cgi/**'}).as('getNutriscore')
    cy.get('.submit').click()

    cy.wait('@getNutriscore')
    cy.url().should('equal', 'http://localhost:4200/product_list?category=&brand=&nutriscore=A')
    cy.get('.allCard').children().should('have.length', 10)
    cy.contains('Food Info').click()

    cy.get('input[name="brand"]').type('Danone').should('have.value', 'Danone')
    cy.get('input[name="category"]').type('Yaourt').should('have.value', 'Yaourt')
    cy.contains('.mat-radio-button', 'A').click()
    cy.intercept({method: 'GET',url: 'https://fr.openfoodfacts.org/cgi/**'}).as('getAll')
    cy.get('.submit').click()

    cy.wait('@getAll')
    cy.url().should('equal', 'http://localhost:4200/product_list?category=Yaourt&brand=Danone&nutriscore=A')
    cy.get('.allCard').children().should('have.length', 10)

    cy.contains('Food Info').click()
    cy.intercept({method: 'GET',url: 'https://fr.openfoodfacts.org/cgi/**'}).as('getNone')
    cy.get('.submit').click()
    cy.wait('@getNone')
    cy.url().should('equal', 'http://localhost:4200/product_list?category=&brand=&nutriscore=')
    cy.get('.allCard').children().should('have.length', 10)
    cy.contains('Food Info').click()

    cy.get('input[name="brand"]').type('fsdsqfdsq').should('have.value', 'fsdsqfdsq')
    cy.get('input[name="category"]').type('fqfds').should('have.value', 'fqfds')
    cy.contains('.mat-radio-button', 'A').click()
    cy.intercept({method: 'GET',url: 'https://fr.openfoodfacts.org/cgi/**'}).as('getNoResult')
    cy.get('.submit').click()
    cy.wait('@getNone')

    cy.contains('Il semblerait que votre demande ne corresponde à aucun élément')
    cy.contains('Retourner à la recherche').click()
    cy.url().should('equal', 'http://localhost:4200/')

  })
})
