const WIKI_API_URL = "https://en.wikipedia.org//w/api.php";
const WARN_TEMPLATE =
    `<div class="alert alert-dismissible alert-warning">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <h4>Warning!</h4>
        <p>Please input search query</p>
    </div>`;

let item_index = 1;

const sendRequest = (search_term) => {
    $.ajax({
        type: "GET",
        url: WIKI_API_URL,
        data: {
            'action': 'query',
            'format': 'json',
            'prop': 'extracts',
            'indexpageids': '1',
            'generator': 'search',
            'exsentences': '1',
            'exlimit': '10',
            'exintro': '1',
            'explaintext': '1',
            'exsectionformat': 'plain',
            'gsrlimit': '10',
            'gsrsearch': `${search_term}`
        },
        dataType: 'jsonp',
        success: data => display(data)
    });
};

const getExternalUrl = (title) => {
    return `https://en.wikipedia.org/wiki/${title}`;
};

const renderPageItem = (item) => {
    const page_url = getExternalUrl(item['title']);
    return `<tr>
                <td class="title">${item_index++}</td>
                <td>
                    <span class="title">${item['title']}</span>
                    <br/>
                    <span class="mini">
                        <a href="${page_url}" target="_blank">${page_url}</a>
                    </span>
                    <br/>
                    <span>${item['extract']}</span>
                </td>
            </tr>`;
};

const display = (data) => {
    let results = $.map(data['query']['pages'], item => {
        return renderPageItem(item);
    });
    $('#results').html(results);
    $("#search-results").css({
        visibility: 'visible'
    });
};

const search = () => {
    const search_term = $('#input').val();
    console.log(search_term);
    if (search_term !== undefined && search_term !== '') {
        item_index = 1;
        sendRequest(search_term);
    } else {
        $('#results').html('');
        $('#search-results').css({
            visibility: 'hidden'
        });
        $('#warn').html(WARN_TEMPLATE);
    }
};

$(document).ready(function () {
    $('#search-results').css({
        visibility: 'hidden'
    });
    $('#input').keyup(event => event.which === 13 ? search() : null);
    $('#search').click(search);
});