(function() {

    var dropdowns = [];
    var dropdownContentHiddenClass = 'dropdown-content--hidden';

    $$('.js-dropdown').forEach(initializeDropdown);

    document.addEventListener('click', function() {
        dropdowns.forEach(closeDropdown);
    });

    function initializeDropdown(dropdown) {
        dropdowns.push(dropdown);
        var trigger = $('.js-dropdown-trigger', dropdown);
        var content = $('.js-dropdown-content', dropdown);

        trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            content.classList.toggle(dropdownContentHiddenClass);
        });

        content.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    function closeDropdown(dropdown) {
        var content = $('.js-dropdown-content', dropdown);
        content.classList.add(dropdownContentHiddenClass);
    }

})();
