describe('race flow', () => {
  it('runs program to results', () => {
    cy.visit('/')

    cy.contains('button', 'GENERATE PROGRAM').click()
    cy.get('.program-item').should('have.length', 6)

    cy.get('.program-item').each(($horse) => {
      cy.wrap($horse).should('contain', 'Horse')
      cy.wrap($horse).find('.condition').should('exist')
      cy.wrap($horse).find('.color').should('exist')
    })

    cy.contains('button', 'START').should('not.be.disabled').click()
    cy.contains('button', 'STARTED')

    cy.get('.result-section', { timeout: 15000 }).should('exist')

    cy.get('.result-section').find('.result-item').should('have.length', 6)

    cy.get('.result-item').first().should('contain', '1')

    cy.get('.result-item').last().should('contain', '6')

    cy.get('.result-item').each(($result) => {
      cy.wrap($result).should('contain', 's')
    })
  });

  it('disables generate button during race', () => {
    cy.visit('/')

    cy.contains('button', 'GENERATE PROGRAM').click()
    cy.get('.program-item').should('have.length', 6)

    cy.contains('button', 'START').click()

    cy.contains('button', 'GENERATE PROGRAM').should('be.disabled')
  });

  it('allows generating new program after race completes', () => {
    cy.visit('/')

    cy.contains('button', 'GENERATE PROGRAM').click()
    cy.get('.program-item').should('have.length', 6)
    cy.contains('button', 'START').click()
    cy.get('.result-section', { timeout: 15000 }).should('exist')

    cy.contains('button', 'GENERATE PROGRAM').should('not.be.disabled').click()
    cy.get('.program-item').should('have.length', 6)
    cy.get('.result-section').should('not.exist')
  });
})
