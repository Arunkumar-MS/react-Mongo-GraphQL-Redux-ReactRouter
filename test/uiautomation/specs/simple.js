describe('node-mongo-graphql page', ()=> {

    it('should have the right title', ()=> {
      expect(browser.getTitle()).to.equal('Product Catalogue');
    });

    it('should have add product button', ()=> {
      expect(browser.isExisting('.add-new.btn.btn-primary')).to.equal(true);
    });

    it('table content should not be empty by default', ()=> {
      expect(browser.elements('table.product-list tbody td').value).to.not.have.lengthOf(0);
    });

});
