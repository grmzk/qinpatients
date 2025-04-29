from djoser import utils
from djoser.views import TokenCreateView


class TokenCreateLogoutView(TokenCreateView):
    def _action(self, serializer):
        self.request.user = serializer.user
        utils.logout_user(self.request)
        return super()._action(serializer)
