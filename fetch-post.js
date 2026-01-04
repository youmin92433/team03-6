const postService = (() => {
    const getList = async (callback, page = 1) => {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts"
        );
        const posts = await response.json();

        if (callback) {
            callback(posts);
        }
    };

    return { getList: getList };
})();

// 문제 1
// 게시글 정보를 전달받은 후, 제목의 길이가 50자 이상인 게시글의 id와 제목을 출력하기
const printLongTitlePosts = (posts) => {
    posts
        .filter((post) => post.title.length >= 50)
        .forEach((post) => {
            console.log(post.id, post.title);
        });
};
// postService.getList(printPostTitles);

// 문제 2
// 게시글을 모듈화하여 조회한 후, userId가 1, 2, 3인 작성자들의 게시글만 필터링하여 userId와 title을 출력하기
const printPostsByUserIds = (posts, userIds) => {
    posts
        .filter((post) => userIds.includes(post.userId))
        .forEach((post) => {
            console.log(post.userId, post.title);
        });
};
// postService.getList((posts) => printPostsByUserIds(posts, [1, 2, 3]));
// callback에서 만든 함수를 사용해 추가적인 작업 가능
// 즉, getList만 필요

// 문제 3
// 게시글 정보를 전달받은 후, 제목에 특정 단어(예: "qui")가 포함된 게시글의 전체 정보를 출력하기
const printPostsByKeyword = (posts, keyword) => {
    posts
        .filter((post) => post.title.includes(keyword))
        .forEach((post) => {
            console.log(post);
        });
};
// postService.getList((posts) => printPostsByKeyword(posts, "qui"));

// 문제 4
// 게시글 조회를 모듈화한 후, 콜백 함수를 통해 id가 10 이하인 게시글의 개수를 세서 출력하기
const printPostsCountById = (posts, maxId) => {
    // maxId로 유연성 확보
    let count = posts.filter((post) => post.id <= maxId).length; // 개수 셀 때, length를 쓰면 더 간결함
    console.log(count);
};
// postService.getList((posts) => printPostsCountById(posts, 10));

// 문제 5
// 게시글을 모듈화하여 조회한 후, userId별로 게시글 개수를 집계하여 출력하기
// (예: userId 1: 10개, userId 2: 10개 ...)
const printPostsCountByUserId = (posts) => {
    const userIds = [...new Set(posts.map((post) => post.userId))];

    userIds.forEach((userId) => {
        let count = posts.filter((post) => post.userId === userId).length;

        console.log(`userId ${userId}: ${count}개`);
    });
};
postService.getList(printPostsCountByUserId);
