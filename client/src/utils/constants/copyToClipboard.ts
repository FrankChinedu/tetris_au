const copyToClipboard = (message: string) => {
    const shareMessage = message;
    const permissionName = "clipboard-write" as PermissionName;
    navigator.permissions.query({name: permissionName}).then(result => {
        if (result.state === "granted" || result.state === "prompt") {
            navigator.clipboard.writeText(shareMessage).then(function() {
                return;
              }, function() {
                alert('Could not copy. Browser declined access');
              });
        }
    });
}

export default copyToClipboard;